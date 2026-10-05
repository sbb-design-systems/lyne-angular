import { parseTemplate, TmplAstElement } from '@angular/compiler';
import type { logging } from '@angular-devkit/core';
import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { SchematicsException } from '@angular-devkit/schematics';

import {
  applyEdits,
  isHtmlFile,
  isTypeScriptFile,
  MigrationEdit,
  visitElements,
} from '../../utils.cjs';
import ts from 'typescript';

/** An attribute which should be dropped, optionally only for a specific value. */
export type RemovableAttribute = string | { name: string; value?: string };

export interface SelectorMigration {
  /**
   * CSS-like selector of the legacy element. Supported forms:
   * - `'button[sbb-button]'` — tag name combined with an attribute
   * - `'sbb-usermenu'`       — plain tag name
   * - `'[sbb-button]'`       — attribute on any tag
   */
  selector: string;
  /** Tag name of the new element, e.g. `'sbb-button'`. */
  replaceWith: string;
  /**
   * Additional attributes to remove during the migration, e.g. the now
   * redundant `type="button"` of a native `<button>`.
   */
  removeAttributes?: RemovableAttribute[];
}

interface ParsedSelector {
  tag?: string;
  attribute?: string;
}

type ParsedSelectorMigration = SelectorMigration & { parsed: ParsedSelector };

/** A template which is declared inline via the `template` property of `@Component`. */
export interface InlineTemplate {
  /** The raw template source, exactly as written in the file. */
  content: string;
  /** Offset of `content` within the containing TypeScript file. */
  start: number;
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

function parseSelector(selector: string): ParsedSelector {
  const match = SELECTOR_PATTERN.exec(selector.trim());
  const parsed = match ? { tag: match[1], attribute: match[2] } : undefined;

  if (!parsed || (!parsed.tag && !parsed.attribute)) {
    throw new SchematicsException(
      `Unsupported selector "${selector}". Supported formats: 'tag', 'tag[attribute]', '[attribute]'.`,
    );
  }

  return parsed;
}

function matches(element: TmplAstElement, selector: ParsedSelector): boolean {
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

/**
 * Queues the removal of an attribute span, extending the range leftward to also
 * consume the whitespace separating it from the preceding attribute/tag name.
 *
 * If the attribute is the only content of its line, the complete line
 * (including its line break) is removed, so that no blank line is left behind
 * in multiline tags.
 */
function queueAttributeRemoval(
  content: string,
  baseOffset: number,
  start: number,
  end: number,
  edits: MigrationEdit[],
  nextIndex: () => number,
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
  });
}

function queueAttributeRemovals(
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
 * Collects the edits required to replace legacy selectors inside a single
 * template.
 *
 * `baseOffset` is the offset of `content` within `filePath`: `0` for external
 * templates and the position of the string/template literal for inline ones.
 */
function collectSelectorEdits(
  content: string,
  baseOffset: number,
  filePath: string,
  migrations: ParsedSelectorMigration[],
  logger: logging.LoggerApi,
): MigrationEdit[] {
  const ast = parseTemplate(content, filePath, {
    preserveWhitespaces: true,
    preserveLineEndings: true,
    leadingTriviaChars: [],
  });

  // Never touch templates which could not be parsed reliably.
  if (ast.errors?.length) {
    return [];
  }

  const edits: MigrationEdit[] = [];
  let editCounter = 0;
  const nextIndex = (): number => editCounter++;

  visitElements(ast.nodes, (element) => {
    const migration = migrations.find((candidate) => matches(element, candidate.parsed));
    if (!migration) {
      return;
    }

    const legacyName = element.name;
    const endSpan = element.endSourceSpan;

    // Without an end span the element was never closed; renaming only the
    // opening tag would corrupt the template, so it is skipped.
    if (!endSpan) {
      logger.warn(
        `  ⚠ Skipped '${migration.selector}' in ${filePath}: the element has no closing tag.`,
      );
      return;
    }

    // 1. Rename the opening tag (`<button` → `<sbb-button`).
    edits.push({
      offset: baseOffset + element.startSourceSpan.start.offset + 1,
      index: nextIndex(),
      length: legacyName.length,
      insertion: migration.replaceWith,
      log: () =>
        logger.info(
          `  → Replaced '${migration.selector}' with '${migration.replaceWith}' in ${filePath}`,
        ),
    });

    // 2. Rename the closing tag, unless the element is self-closing or void.
    if (
      endSpan.start.offset !== element.startSourceSpan.start.offset &&
      content.startsWith('</', endSpan.start.offset)
    ) {
      edits.push({
        offset: baseOffset + endSpan.start.offset + 2,
        index: nextIndex(),
        length: legacyName.length,
        insertion: migration.replaceWith,
      });
    }

    // 3. Drop the marker attribute of the selector (it is the tag now) plus any
    //    attribute which became obsolete through the replacement.
    const removals: RemovableAttribute[] = [
      ...(migration.parsed.attribute ? [migration.parsed.attribute] : []),
      ...(migration.removeAttributes ?? []),
    ];
    queueAttributeRemovals(element, removals, content, baseOffset, edits, nextIndex);
  });

  return edits;
}

/**
 * Creates a rule which replaces legacy template selectors with their Lyne
 * counterpart, both in external templates (`templateUrl`) and in inline
 * templates (`template`).
 *
 * ```ts
 * createTemplateSelectorMigrationRule([
 *   { selector: 'button[sbb-button]', replaceWith: 'sbb-button' },
 * ]);
 * ```
 */
export function createTemplateSelectorMigrationRule(migrations: SelectorMigration[]): Rule {
  const parsedMigrations: ParsedSelectorMigration[] = migrations.map((migration) => ({
    ...migration,
    parsed: parseSelector(migration.selector),
  }));

  return (tree: Tree, context: SchematicContext) => {
    if (!parsedMigrations.length) {
      return;
    }

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
      const templates = isHtml
        ? [{ content: original, start: 0 }]
        : findInlineTemplates(filePath, original);

      const edits = templates.flatMap((template) =>
        collectSelectorEdits(
          template.content,
          template.start,
          filePath,
          parsedMigrations,
          context.logger,
        ),
      );

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
