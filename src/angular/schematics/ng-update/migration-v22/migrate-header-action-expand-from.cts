import { ResolvedResource } from '@angular/cdk/schematics';
import {
  AttributeMigrationBase,
  MigrationEdit,
  queueFixmeComment,
} from './attribute-migration-base.cjs';

/**
 * Migration that manages the transition of the `expandFrom` and `expand-from` attributes to `hideLabelBelow`
 * on <sbb-header-button> and <sbb-header-link> components.
 */
export class MigrateHeaderActionExpandFrom extends AttributeMigrationBase {
  private get TAG_PATTERN(): RegExp {
    return /<(sbb-header-button|sbb-header-link)(\b[^>]*?)(\/?)>/gi;
  }

  /**
   * Matches ONLY strictly static expandFrom="value" or expand-from="value".
   */
  private readonly STATIC_EXPAND_FROM_PATTERN =
    /(\s+)(expandFrom|expand-from)\s*=\s*(?:"(?<dq>[^"]*)"|'(?<sq>[^']*)')/i;

  /**
   * Matches valid bound expandFrom forms. Targets [expandFrom], [expand-from], [attr.expandFrom], and [attr.expand-from].
   */
  private readonly BOUND_EXPAND_FROM_PATTERN =
    /(\s+)(?:\[\(?(expandFrom|expand-from)\)?\]|\[attr\.(expandFrom|expand-from)\])\s*=\s*(?:"[^"]*"|'[^']*')/i;

  /**
   * Matches any valid form of expandFrom or expand-from (static or bound) to identify its presence.
   */
  private readonly ANY_EXPAND_FROM_PATTERN =
    /(\s+)(?:\[\(?(?:expandFrom|expand-from)\)?\]|\[attr\.(?:expandFrom|expand-from)\]|(?:expandFrom|expand-from))\s*=\s*(?:"[^"]*"|'[^']*')/i;

  protected override collectEdits(
    template: ResolvedResource,
    edits: MigrationEdit[],
    nextIndex: () => number,
    fullSource: string,
  ): void {
    const tagPattern = this.TAG_PATTERN;

    let tagMatch: RegExpExecArray | null;
    while ((tagMatch = tagPattern.exec(template.content)) !== null) {
      const [, tagName, attrs] = tagMatch;
      const tagFileOffset = template.start + tagMatch.index;
      const tagNameEndOffset = tagFileOffset + 1 + tagName.length;

      const hasExpandFrom = this.ANY_EXPAND_FROM_PATTERN.test(attrs);

      // Rule #1: no expandFrom / expand-from -> insert hideLabelBelow immediately after tag name.
      if (!hasExpandFrom) {
        edits.push({
          offset: tagNameEndOffset,
          index: nextIndex(),
          length: 0,
          insertion: ` hideLabelBelow="large"`,
          log: () =>
            this.logger.info(
              `    Added \`hideLabelBelow="large"\` to \`<${tagName}>\` (no expandFrom/expand-from present).`,
            ),
        });
        continue;
      }

      // Rule #2: bound expandFrom / expand-from -> add FIXME message for manual update, leave untouched.
      const boundMatch = this.BOUND_EXPAND_FROM_PATTERN.exec(attrs);
      if (boundMatch) {
        const matchedName = boundMatch[2] ?? boundMatch[3];

        this.logger.warn(
          `    FIXME: bound or attribute-bound \`${matchedName}\` on \`<${tagName}>\` could not be migrated automatically.`,
        );
        queueFixmeComment(
          fullSource,
          edits,
          nextIndex(),
          template,
          tagFileOffset,
          `FIXME: bound \`${matchedName}\` on \`<${tagName}>\` must be migrated manually to \`hideLabelBelow\``,
        );
        continue;
      }

      // Rule #3: static expandFrom / expand-from.
      const staticMatch = this.STATIC_EXPAND_FROM_PATTERN.exec(attrs);
      if (!staticMatch) {
        continue;
      }

      const attrFileOffset = tagNameEndOffset + staticMatch.index;
      const leadingSpace = staticMatch[1];
      const matchedName = staticMatch[2];
      const expandFromValue = (
        staticMatch.groups?.['dq'] ??
        staticMatch.groups?.['sq'] ??
        ''
      ).trim();

      if (expandFromValue === 'zero') {
        // Rule #3a: value is "zero" -> remove attribute completely.
        edits.push({
          offset: attrFileOffset,
          index: nextIndex(),
          length: staticMatch[0].length,
          log: () =>
            this.logger.info(
              `    Removed \`${matchedName}\` attribute from \`<${tagName}>\` (value was zero).`,
            ),
        });
      } else {
        // Rule #3b: value is not "zero" -> remove attribute, add hideLabelBelow with same value
        edits.push({
          offset: attrFileOffset,
          index: nextIndex(),
          length: staticMatch[0].length,
          insertion: `${leadingSpace}hideLabelBelow="${expandFromValue}"`,
          log: () =>
            this.logger.info(
              `    Migrated \`${matchedName}="${expandFromValue}"\` to \`hideLabelBelow="${expandFromValue}"\` on \`<${tagName}>\`.`,
            ),
        });
      }
    }
  }
}
