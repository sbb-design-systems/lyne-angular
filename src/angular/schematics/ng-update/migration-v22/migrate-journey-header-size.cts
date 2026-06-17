import { ResolvedResource } from '@angular/cdk/schematics';
import {
  AttributeMigrationBase,
  MigrationEdit,
  queueFixmeComment,
} from './attribute-migration-base.cjs';

const SIZE_TO_VISUAL_LEVEL: Record<string, string> = {
  s: '6',
  m: '5',
  l: '4',
};

/**
 * Migration that replaces the `size` property with `visualLevel` on `sbb-journey-header`.
 */
export class MigrateJourneyHeaderSize extends AttributeMigrationBase {
  private get TAG_PATTERN(): RegExp {
    return /<(sbb-journey-header)(\b[^>]*?)(\/?)>/gi;
  }

  /** Matches ONLY strictly static size="value" (capturing leading whitespace). */
  private readonly STATIC_SIZE_PATTERN = /(\s+)size\s*=\s*(?:"(?<dq>[^"]*)"|'(?<sq>[^']*)')/i;

  /**
   * Matches valid bound size forms (capturing leading whitespace for boundary consistency).
   * Targets [size] and [attr.size].
   */
  private readonly BOUND_SIZE_PATTERN =
    /(\s+)(?:\[\(?size\)?\]|\[attr\.size\])\s*=\s*(?:"[^"]*"|'[^']*')/i;

  /**
   * Matches any valid form of size (static or bound) to identify its presence.
   * Leading \s+ ensures we don't match 'size' inside an attribute value string.
   */
  private readonly ANY_SIZE_PATTERN =
    /(\s+)(?:\[\(?size\)?\]|\[attr\.size\]|size)\s*=\s*(?:"[^"]*"|'[^']*')/i;

  /** Matches any visualLevel attribute (static or bound). */
  private readonly VISUAL_LEVEL_PRESENT_PATTERN = /\bvisualLevel\b/i;

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

      // Rule #1: visualLevel present -> remove size unconditionally.
      if (this.VISUAL_LEVEL_PRESENT_PATTERN.test(attrs)) {
        const sizeMatch = this.ANY_SIZE_PATTERN.exec(attrs);
        if (!sizeMatch) {
          continue;
        }
        edits.push({
          offset: tagNameEndOffset + sizeMatch.index,
          index: nextIndex(),
          length: sizeMatch[0].length,
          log: () =>
            this.logger.info(
              `    Removed \`size\` attribute from \`<${tagName}>\` (visualLevel already present).`,
            ),
        });
        continue;
      }

      // Rule #2: bound size -> add FIXME message for manual update, leave untouched.
      if (this.BOUND_SIZE_PATTERN.test(attrs)) {
        this.logger.warn(
          `    FIXME: bound \`size\` attribute on \`<${tagName}>\` could not be migrated automatically.`,
        );
        queueFixmeComment(
          fullSource,
          edits,
          nextIndex(),
          template,
          tagFileOffset,
          `FIXME: bound \`size\` on \`<${tagName}>\` must be migrated manually to \`visualLevel\``,
        );
        continue;
      }

      // Rule #3: static size, no visualLevel.
      const staticMatch = this.STATIC_SIZE_PATTERN.exec(attrs);
      if (!staticMatch) {
        continue;
      }

      const sizeValue = (staticMatch.groups?.['dq'] ?? staticMatch.groups?.['sq'] ?? '').trim();
      const mappedLevel = SIZE_TO_VISUAL_LEVEL[sizeValue];
      const leadingSpace = staticMatch[1];
      edits.push({
        offset: tagNameEndOffset + staticMatch.index,
        index: nextIndex(),
        length: staticMatch[0].length,
        insertion: `${leadingSpace}visualLevel="${mappedLevel}"`,
        log: () =>
          this.logger.info(
            `    Replaced \`size="${sizeValue}"\` with \`visualLevel="${mappedLevel}"\` on \`<${tagName}>\`.`,
          ),
      });
    }
  }
}
