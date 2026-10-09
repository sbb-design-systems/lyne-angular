import { parseTemplate, TmplAstElement } from '@angular/compiler';
import type { ParseSourceSpan } from '@angular/compiler';
import type { logging } from '@angular-devkit/core';
import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { SchematicsException } from '@angular-devkit/schematics';
import ts from 'typescript';

import {
  applyEdits,
  isHtmlFile,
  isTypeScriptFile,
  MigrationEdit,
  visitElements,
} from '../utils.cjs';

/** A template which is declared inline via the `template` property of `@Component`. */
export interface InlineTemplate {
  /** The raw template source, exactly as written in the file. */
  content: string;
  /** Offset of `content` within the containing TypeScript file. */
  start: number;
}

/** An attribute which should be dropped, optionally only for a specific value. */
export type RemovableAttribute = string | { name: string; value?: string };

/** A selector which has been split into its tag and attribute part. */
export interface ParsedSelector {
  tag?: string;
  attribute?: string;
}

/** Everything a template migration needs to describe its edits. */
export interface TemplateMigrationContext {
  /** The raw template source. */
  content: string;
  /** Offset of `content` within `filePath`; `0` for external templates. */
  baseOffset: number;
  /** Path of the file which contains the template. */
  filePath: string;
  /** Full, unmodified content of `filePath` (equals `content` for external templates). */
  fileContent: string;
  /** Whether the template is declared inline via the `template` property of `@Component`. */
  inline: boolean;
  /** Collected edits; push the required changes here. */
  edits: MigrationEdit[];
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
 * The returned `content` is the raw source slice (not `node.text`), so that all
 * offsets reported by the template parser can be mapped back to the file by
 * simply adding `start`.
 */
export function findInlineTemplates(filePath: string, fileContent: string): InlineTemplate[] {
  const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);
  const templates: InlineTemplate[] = [];

  const isComponentDecorator = (
    node: ts.Decorator,
  ): node is ts.Decorator & {
    expression: ts.CallExpression;
  } => {
    const expression = node.expression;
    if (!ts.isCallExpression(expression)) {
      return false;
    }
    const identifier = ts.isPropertyAccessExpression(expression.expression)
      ? expression.expression.name
      : expression.expression;
    return ts.isIdentifier(identifier) && identifier.text === 'Component';
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
          templates.push({ content: fileContent.slice(start, end), start });
        }
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  return templates;
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

/**
 * Queues the removal of an attribute span, extending the range leftward to also
 * consume the whitespace separating it from the preceding attribute/tag name.
 *
 * If the attribute is the only content of its line, the complete line
 * (including its line break) is removed, so that no blank line is left behind
 * in multiline tags.
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
 * Resolves the span of the attribute name itself (without binding syntax and
 * value). Falls back to a lookup inside the full attribute span for parser
 * versions which do not provide a `keySpan`.
 */
export function resolveKeySpan(
  node: { sourceSpan: ParseSourceSpan; keySpan?: ParseSourceSpan },
  name: string,
  content: string,
): { start: number; end: number } | undefined {
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
 * in the workspace, both for external templates (`templateUrl`) and for inline
 * templates (`template`), and applies the collected edits.
 *
 * It is the shared foundation of the concrete template migrations (selector,
 * attribute, ...), which only have to describe their edits.
 */
export function createTemplateMigrationRule(
  collectEdits: (element: TmplAstElement, context: TemplateMigrationContext) => void,
): Rule {
  return (tree: Tree, context: SchematicContext) => {
    tree.visit((filePath) => {
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
        const ast = parseTemplate(template.content, filePath, {
          preserveWhitespaces: true,
          preserveLineEndings: true,
          leadingTriviaChars: [],
        });

        // Never touch templates which could not be parsed reliably.
        if (ast.errors?.length) {
          continue;
        }

        visitElements(ast.nodes, (element) =>
          collectEdits(element, {
            content: template.content,
            baseOffset: template.start,
            filePath,
            fileContent: original,
            inline: !isHtml,
            edits,
            nextIndex,
            logger: context.logger,
          }),
        );
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
