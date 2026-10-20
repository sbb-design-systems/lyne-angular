import type { ParseSourceSpan } from '@angular/compiler';
import { parseTemplate, TmplAstElement } from '@angular/compiler';
import type { logging } from '@angular-devkit/core';
import {
  type Rule,
  type SchematicContext,
  SchematicsException,
  type Tree,
} from '@angular-devkit/schematics';
import ts from 'typescript';

import {
  applyEdits,
  isHtmlFile,
  isTypeScriptFile,
  MigrationEdit,
  MigrationScope,
  visitElements,
  visitScopedFiles,
} from '../utils.cjs';

/** A template which is declared inline via the `template` property of `@Component`. */
export interface InlineTemplate {
  /** The raw template source, exactly as written in the file (escape sequences are not decoded). */
  content: string;
  /** Offset of `content` within the containing TypeScript file. */
  start: number;
  /**
   * Quote of the enclosing string / template literal. When set, `content` has to be decoded
   * ({@link decodeInlineTemplate}) before it is parsed and inserted text has to be escaped
   * ({@link escapeForInlineLiteral}). Omitted for external templates, which are used verbatim.
   */
  quote?: InlineQuote;
}

/** Quote character of the literal enclosing an inline template. */
export type InlineQuote = '"' | "'" | '`';

/** The effective text of an inline template literal together with a map back to the source. */
export interface DecodedTemplate {
  /** The template text with all escape sequences resolved; this is what the template parser sees. */
  text: string;
  /**
   * Offset within the raw literal content for every offset of `text`, plus a final entry for
   * its end (`offsets.length === text.length + 1`).
   */
  offsets: number[];
}

/** An attribute which should be dropped, optionally only for a specific value. */
export type RemovableAttribute = string | { name: string; value?: string };

/** Static attribute, bound input or output of an element. */
export type AttributeNode = {
  name: string;
  sourceSpan: ParseSourceSpan;
  keySpan?: ParseSourceSpan;
};

/** A selector which has been split into its tag and attribute part. */
export interface ParsedSelector {
  tag?: string;
  attribute?: string;
}

export interface Span {
  start: number;
  end: number;
}

/** Everything a template migration needs to describe its edits. */
export interface TemplateMigrationContext {
  /**
   * The effective template source, which the template parser saw. For inline templates, escape
   * sequences of the enclosing literal are already decoded (`[svgIcon]=\"x\"` is `[svgIcon]="x"`).
   */
  content: string;
  /**
   * Offset of `content` within `filePath`; `0` for external templates. Edits are described in
   * the coordinates of `content` (`baseOffset + offset`); for inline templates they are mapped
   * back to the source and their `insertion` is escaped for the enclosing literal afterwards.
   */
  baseOffset: number;
  /** Path of the file which contains the template. */
  filePath: string;
  /**
   * Full, unmodified content of `filePath` (equals `content` for external templates).
   * For inline templates it is raw TypeScript, so offsets of `content` do not apply to it.
   */
  fileContent: string;
  /** Whether the template is declared inline via the `template` property of `@Component`. */
  inline: boolean;
  /**
   * Collected edits; push the required changes here. For inline templates they are expressed in
   * the coordinates of `content` and escaped for the enclosing literal (see `baseOffset`).
   */
  edits: MigrationEdit[];
  /**
   * Edits of the whole file, in raw file coordinates and never escaped. Use it for changes
   * *outside* of the template text, e.g. a `//` comment above the `template:` property.
   * Identical to `edits` for external templates.
   */
  fileEdits: MigrationEdit[];
  /** Stable tiebreaker for edits sharing the same offset. */
  nextIndex: () => number;
  logger: logging.LoggerApi;
}

const SELECTOR_PATTERN = /^([a-zA-Z][\w-]*)?(?:\[([\w-]+)\])?$/;

/**
 * Collects all inline templates (`@Component({ template: ... })`) of a file.
 *
 * Both quoted strings and (substitution free) template literals are supported.
 * Template literals containing `${}` substitutions are skipped, because their
 * effective content is only known at runtime.
 *
 * The returned `content` is the raw source slice (not `node.text`) together with the `quote`
 * of its literal. Decode it with {@link decodeInlineTemplate} before parsing it:
 * the decoded offsets are mapped back to the file through the returned `offsets`.
 */
export function findInlineTemplates(filePath: string, fileContent: string): InlineTemplate[] {
  const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);
  const templates: InlineTemplate[] = [];

  // Local bindings of `Component` imported from `@angular/core`, e.g.
  // `import { Component as NgComponent }` or `import * as ng from '@angular/core'`.
  const componentNames = new Set<string>();
  const coreNamespaces = new Set<string>();

  for (const statement of sourceFile.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      !ts.isStringLiteral(statement.moduleSpecifier) ||
      statement.moduleSpecifier.text !== '@angular/core' ||
      !statement.importClause ||
      ts.isTypeOnlyImportDeclaration(statement.importClause)
    ) {
      continue;
    }

    const bindings = statement.importClause.namedBindings;
    if (!bindings) {
      continue;
    }

    if (ts.isNamespaceImport(bindings)) {
      coreNamespaces.add(bindings.name.text);
    } else {
      for (const specifier of bindings.elements) {
        // `propertyName` is the exported name when the import is aliased.
        const importedName = (specifier.propertyName ?? specifier.name).text;
        if (importedName === 'Component' && !ts.isTypeOnlyImportDeclaration(specifier)) {
          componentNames.add(specifier.name.text);
        }
      }
    }
  }

  const isComponentDecorator = (
    node: ts.Decorator,
  ): node is ts.Decorator & {
    expression: ts.CallExpression;
  } => {
    const expression = node.expression;
    if (!ts.isCallExpression(expression)) {
      return false;
    }

    const callee = expression.expression;
    if (ts.isIdentifier(callee)) {
      return componentNames.has(callee.text);
    }

    return (
      ts.isPropertyAccessExpression(callee) &&
      ts.isIdentifier(callee.expression) &&
      coreNamespaces.has(callee.expression.text) &&
      callee.name.text === 'Component'
    );
  };

  const visit = (node: ts.Node): void => {
    if (ts.isDecorator(node) && isComponentDecorator(node)) {
      for (const argument of node.expression.arguments) {
        if (!ts.isObjectLiteralExpression(argument)) {
          continue;
        }

        for (const property of argument.properties) {
          if (
            !ts.isPropertyAssignment(property) ||
            !(ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) ||
            property.name.text !== 'template'
          ) {
            continue;
          }

          const initializer = property.initializer;
          if (
            !ts.isStringLiteral(initializer) &&
            !ts.isNoSubstitutionTemplateLiteral(initializer)
          ) {
            continue;
          }

          // Skip the enclosing quotes / backticks.
          const start = initializer.getStart(sourceFile) + 1;
          const end = initializer.getEnd() - 1;
          templates.push({
            content: fileContent.slice(start, end),
            start,
            quote: fileContent[start - 1] as InlineQuote,
          });
        }
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  return templates;
}

const SIMPLE_ESCAPES: Record<string, string> = {
  n: '\n',
  r: '\r',
  t: '\t',
  b: '\b',
  f: '\f',
  v: '\v',
};

/**
 * Resolves the escape sequences of the raw content of a string or template literal, so that the
 * template parser sees the effective template, and records where every character came from.
 *
 * Returns `undefined` for content with malformed or (in template literals) forbidden escapes,
 * which cannot be interpreted reliably.
 */
export function decodeInlineTemplate(raw: string, quote: InlineQuote): DecodedTemplate | undefined {
  let text = '';
  const offsets: number[] = [];

  /** Appends decoded code units; every unit after the first maps to the end of the sequence. */
  const emit = (value: string, from: number, to: number): void => {
    for (let k = 0; k < value.length; k++) {
      offsets.push(k === 0 ? from : to);
      text += value[k];
    }
  };

  let i = 0;
  while (i < raw.length) {
    const char = raw[i];

    if (char !== '\\') {
      if (quote === '`' && char === '\r') {
        // Template literals normalize line breaks to `\n`.
        const length = raw[i + 1] === '\n' ? 2 : 1;
        emit('\n', i, i + length);
        i += length;
      } else {
        emit(char, i, i + 1);
        i++;
      }
      continue;
    }

    const next = raw[i + 1];
    if (next === undefined) {
      return undefined;
    }

    if (next in SIMPLE_ESCAPES) {
      emit(SIMPLE_ESCAPES[next], i, i + 2);
      i += 2;
    } else if (next === 'x') {
      const hex = /^[0-9a-fA-F]{2}/.exec(raw.slice(i + 2, i + 4))?.[0];
      if (!hex) {
        return undefined;
      }
      emit(String.fromCharCode(parseInt(hex, 16)), i, i + 4);
      i += 4;
    } else if (next === 'u') {
      const braced = /^\{([0-9a-fA-F]+)\}/.exec(raw.slice(i + 2));
      const hex = braced ? braced[1] : /^[0-9a-fA-F]{4}/.exec(raw.slice(i + 2, i + 6))?.[0];
      const codePoint = hex ? parseInt(hex, 16) : NaN;
      if (!hex || codePoint > 0x10ffff) {
        return undefined;
      }
      const length = 2 + (braced ? braced[0].length : 4);
      emit(String.fromCodePoint(codePoint), i, i + length);
      i += length;
    } else if (/[0-9]/.test(next)) {
      // Template literals only allow a lone `\0`.
      if (quote === '`' && (next !== '0' || /[0-9]/.test(raw[i + 2] ?? ''))) {
        return undefined;
      }
      // Legacy octal escapes (strings only); `\0` is a plain NUL, `\8` and `\9` stand for themselves.
      const octal = /^(?:[0-3][0-7]{0,2}|[4-7][0-7]?)/.exec(raw.slice(i + 1))?.[0];
      if (octal) {
        emit(String.fromCharCode(parseInt(octal, 8)), i, i + 1 + octal.length);
        i += 1 + octal.length;
      } else {
        emit(next, i, i + 2);
        i += 2;
      }
    } else if (next === '\r' || next === '\n' || next === '\u2028' || next === '\u2029') {
      // Line continuation: contributes nothing to the value.
      i += next === '\r' && raw[i + 2] === '\n' ? 3 : 2;
    } else {
      // `\"`, `\'`, `` \` ``, `\\`, `\$` and every other character stand for themselves.
      emit(next, i, i + 2);
      i += 2;
    }
  }

  offsets.push(raw.length);
  return { text, offsets };
}

/** Escapes inserted text so that it is part of the literal's value instead of ending or altering it. */
export function escapeForInlineLiteral(text: string, quote: InlineQuote): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '\\' || char === quote) {
      result += `\\${char}`;
    } else if (quote === '`' && char === '$' && text[i + 1] === '{') {
      result += '\\$';
    } else if (char === '\r') {
      result += '\\r';
    } else if (char === '\n') {
      result += quote === '`' ? char : '\\n';
    } else if (char === '\u2028' || char === '\u2029') {
      result += `\\u${char.charCodeAt(0).toString(16)}`;
    } else {
      result += char;
    }
  }
  return result;
}

/** Maps an edit of a decoded inline template back to the file source and escapes its insertion. */
function toSourceEdit(
  edit: MigrationEdit,
  template: InlineTemplate & { quote: InlineQuote },
  decoded: DecodedTemplate,
): MigrationEdit {
  const last = decoded.text.length;
  // Edits which are not located within the template text (e.g. a comment above the `template:` line)
  // already are in file coordinates; they must neither be mapped nor escaped.
  if (edit.offset < template.start || edit.offset - template.start > last) {
    return edit;
  }
  const from = edit.offset - template.start;
  const to = Math.min(from + edit.length, last);
  const sourceFrom = decoded.offsets[from];
  const sourceTo = decoded.offsets[to];

  return {
    ...edit,
    offset: template.start + sourceFrom,
    length: sourceTo - sourceFrom,
    insertion:
      edit.insertion === undefined
        ? undefined
        : escapeForInlineLiteral(edit.insertion, template.quote),
  };
}

/**
 * Parses a CSS-like selector. Supported forms:
 * - `'button[sbb-button]'` — tag name combined with an attribute
 * - `'sbb-button'`         — plain tag name
 * - `'[sbb-button]'`       — attribute on any tag
 */
export function parseSelector(selector: string): ParsedSelector {
  const match = SELECTOR_PATTERN.exec(selector.trim());
  const parsed = match ? { tag: match[1], attribute: match[2] } : undefined;

  if (!parsed || (!parsed.tag && !parsed.attribute)) {
    throw new SchematicsException(
      `Unsupported selector "${selector}". Supported formats: 'tag', 'tag[attribute]', '[attribute]'.`,
    );
  }

  return parsed;
}

/** Whether the given element is matched by the parsed selector. */
export function elementMatches(element: TmplAstElement, selector: ParsedSelector): boolean {
  if (selector.tag && element.name !== selector.tag) {
    return false;
  }

  if (!selector.attribute) {
    return true;
  }

  return (
    element.attributes.some((attribute) => attribute.name === selector.attribute) ||
    element.inputs.some((input) => input.name === selector.attribute)
  );
}

/** `'iconName'` → `'icon-name'` */
export function toDashCase(name: string): string {
  return name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

/** `'icon-name'` → `'iconName'` */
export function toCamelCase(name: string): string {
  return name.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

/**
 * All spellings an attribute can be written with in a template, e.g.
 * `'iconName'` → `['iconName', 'icon-name']`.
 */
export function attributeNameVariants(name: string): string[] {
  return [...new Set([name, toCamelCase(name), toDashCase(name)])];
}

export function attributeNodes(element: TmplAstElement): AttributeNode[] {
  return [...element.attributes, ...element.inputs, ...element.outputs];
}

/** Whether the element already uses the target name, which would create a duplicate. */
export function hasAttribute(element: TmplAstElement, name: string): boolean {
  const variants = attributeNameVariants(name);
  return attributeNodes(element).some((node) => variants.includes(node.name));
}

/**
 * Queues the removal of an attribute span, extending the range leftward to also
 * consume the whitespace separating it from the preceding attribute/tag name.
 *
 * If the attribute is the only content of its line, the complete line
 * (including its line break) is removed, so that no blank line is left behind in multiline tags.
 */
export function queueAttributeRemoval(
  content: string,
  baseOffset: number,
  start: number,
  end: number,
  edits: MigrationEdit[],
  nextIndex: () => number,
  log?: () => void,
): void {
  let whitespaceStart = start - 1;
  while (
    whitespaceStart >= 0 &&
    (content[whitespaceStart] === ' ' || content[whitespaceStart] === '\t')
  ) {
    whitespaceStart--;
  }
  let removeFrom = whitespaceStart + 1;
  let removeTo = end;

  if (content[removeFrom - 1] === '\n') {
    // Everything up to the next line break is whitespace => drop the line.
    let lineEnd = end;
    while (lineEnd < content.length && (content[lineEnd] === ' ' || content[lineEnd] === '\t')) {
      lineEnd++;
    }

    if (lineEnd >= content.length || content[lineEnd] === '\n' || content[lineEnd] === '\r') {
      removeTo = lineEnd;
      removeFrom -= content[removeFrom - 2] === '\r' ? 2 : 1;
    }
  }

  edits.push({
    offset: baseOffset + removeFrom,
    index: nextIndex(),
    length: removeTo - removeFrom,
    log,
  });
}

/** Queues the removal of all given attributes from `element`. */
export function queueAttributeRemovals(
  element: TmplAstElement,
  attributes: RemovableAttribute[],
  content: string,
  baseOffset: number,
  edits: MigrationEdit[],
  nextIndex: () => number,
): void {
  for (const attribute of attributes) {
    const name = typeof attribute === 'string' ? attribute : attribute.name;
    const value = typeof attribute === 'string' ? undefined : attribute.value;

    const staticAttribute = element.attributes.find(
      (candidate) => candidate.name === name && (value === undefined || candidate.value === value),
    );
    // A bound attribute has no statically known value, so it is only removed
    // when the migration does not require a specific value.
    const boundAttribute =
      value === undefined ? element.inputs.find((input) => input.name === name) : undefined;
    const node = staticAttribute ?? boundAttribute;

    if (node) {
      queueAttributeRemoval(
        content,
        baseOffset,
        node.sourceSpan.start.offset,
        node.sourceSpan.end.offset,
        edits,
        nextIndex,
      );
    }
  }
}

/**
 * Resolves the span of the attribute name itself (without binding syntax and value).
 * Falls back to a lookup inside the full attribute span for parser versions which do not provide a `keySpan`.
 */
export function resolveKeySpan(
  node: { sourceSpan: ParseSourceSpan; keySpan?: ParseSourceSpan },
  name: string,
  content: string,
): Span | undefined {
  if (node.keySpan) {
    return { start: node.keySpan.start.offset, end: node.keySpan.end.offset };
  }

  const start = content.indexOf(name, node.sourceSpan.start.offset);
  return start >= 0 && start < node.sourceSpan.end.offset
    ? { start, end: start + name.length }
    : undefined;
}

/**
 * Creates a rule which runs `collectEdits` for every element of every template
 * in the workspace (or in the given `scope` only), both for external templates
 * (`templateUrl`) and for inline templates (`template`), and applies the collected edits.
 *
 * It is the shared foundation of the concrete template migrations (selector, attribute, ...),
 * which only have to describe their edits.
 */
export function createTemplateMigrationRule(
  collectEdits: (element: TmplAstElement, context: TemplateMigrationContext) => void,
  scope?: MigrationScope,
): Rule {
  return (tree: Tree, context: SchematicContext) => {
    visitScopedFiles(tree, scope, (filePath) => {
      const isHtml = isHtmlFile(filePath);
      if (!isHtml && !isTypeScriptFile(filePath)) {
        return;
      }

      const buffer = tree.read(filePath);
      if (!buffer) {
        return;
      }

      const original = buffer.toString('utf-8');
      const templates: InlineTemplate[] = isHtml
        ? [{ content: original, start: 0 }]
        : findInlineTemplates(filePath, original);

      const edits: MigrationEdit[] = [];
      let editCounter = 0;
      const nextIndex = (): number => editCounter++;

      for (const template of templates) {
        // Inline templates are parsed in their effective (decoded) form; edits are mapped back below.
        const decoded = template.quote
          ? decodeInlineTemplate(template.content, template.quote)
          : undefined;
        if (template.quote && !decoded) {
          continue;
        }
        const content = decoded ? decoded.text : template.content;

        const ast = parseTemplate(content, filePath, {
          preserveWhitespaces: true,
          preserveLineEndings: true,
          leadingTriviaChars: [],
        });

        // Never touch templates which could not be parsed reliably.
        if (ast.errors?.length) {
          continue;
        }

        const templateEdits: MigrationEdit[] = decoded ? [] : edits;
        visitElements(ast.nodes, (element) =>
          collectEdits(element, {
            content,
            baseOffset: template.start,
            filePath,
            fileContent: original,
            inline: !isHtml,
            edits: templateEdits,
            fileEdits: edits,
            nextIndex,
            logger: context.logger,
          }),
        );

        if (decoded) {
          const inlineTemplate = { ...template, quote: template.quote! };
          edits.push(...templateEdits.map((edit) => toSourceEdit(edit, inlineTemplate, decoded)));
        }
      }

      if (!edits.length) {
        return;
      }

      const updated = applyEdits(original, edits);
      if (updated !== original) {
        tree.overwrite(filePath, updated);
      }
    });
  };
}
