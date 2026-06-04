import { Migration, ResolvedResource } from '@angular/cdk/schematics';
import { MigrationEdit, queueFixmeComment } from './migration-utils.cjs';

const SIZE_TO_VISUAL_LEVEL: Record<string, string> = {
  s: '6',
  m: '5',
  l: '4',
};

/**
 * Migration that replaces the `size` property with `visualLevel` on `sbb-journey-header`.
 */
export class MigrateJourneyHeaderSize extends Migration<null> {
  enabled = true;

  private readonly TAG_PATTERN = /<(sbb-journey-header)(\b[^>]*?)(\/?)>/gi;

  /** Matches a static size attribute, capturing leading whitespace to avoid manual offset math. */
  private readonly STATIC_SIZE_PATTERN = /(\s+)size\s*=\s*(?:"(?<dq>[^"]*)"|'(?<sq>[^']*)')/i;

  /** Matches any size attribute (including attr.size variants), capturing leading whitespace. */
  private readonly ANY_SIZE_PATTERN = /(\s+)\[?\(?(?:attr\.)?size\)?\]?\s*=\s*(?:"[^"]*"|'[^']*')/i;

  /** Matches a bound size attribute, including [attr.size] and [(attr.size)]. */
  private readonly BOUND_SIZE_PATTERN = /\[\(?(?:attr\.)?size\)?\]\s*=\s*(?:"[^"]*"|'[^']*')/i;

  /** Matches any visualLevel attribute (static or bound). */
  private readonly VISUAL_LEVEL_PRESENT_PATTERN = /\bvisualLevel\b/i;

  override visitTemplate(template: ResolvedResource): void {
    const editor = this.fileSystem.edit(template.filePath);
    const edits: MigrationEdit[] = [];
    let editCounter = 0;

    let tagMatch: RegExpExecArray | null;
    this.TAG_PATTERN.lastIndex = 0;

    while ((tagMatch = this.TAG_PATTERN.exec(template.content)) !== null) {
      const [, tagName, attrs] = tagMatch;
      const tagFileOffset = template.start + tagMatch.index;

      // Rule #1: visualLevel present -> remove size unconditionally
      if (this.VISUAL_LEVEL_PRESENT_PATTERN.test(attrs)) {
        const sizeMatch = this.ANY_SIZE_PATTERN.exec(attrs);
        if (!sizeMatch) {
          continue;
        }
        const attrFileOffset = tagFileOffset + tagName.length + sizeMatch.index + 1;

        edits.push({
          offset: attrFileOffset,
          index: editCounter++,
          length: sizeMatch[0].length,
          log: () =>
            this.logger.info(
              `    Removed \`size\` attribute from \`<${tagName}>\` (visualLevel already present).`,
            ),
        });
        continue;
      }

      // Rule #2: bound size -> add FIXME message for manual update, leave untouched
      if (this.BOUND_SIZE_PATTERN.test(attrs)) {
        this.logger.warn(
          `    FIXME: bound \`size\` attribute on \`<${tagName}>\` could not be migrated automatically.`,
        );
        queueFixmeComment(
          this.fileSystem,
          edits,
          editCounter++,
          template,
          tagFileOffset,
          `FIXME: bound \`size\` on \`<${tagName}>\` must be migrated manually to \`visualLevel\``,
        );
        continue;
      }

      // Rule #3: static size, no visualLevel -> remove size, insert mapped visualLevel
      const staticMatch = this.STATIC_SIZE_PATTERN.exec(attrs);
      if (!staticMatch) {
        continue;
      }

      const sizeValue = (staticMatch.groups?.['dq'] ?? staticMatch.groups?.['sq'] ?? '').trim();
      const mappedLevel = SIZE_TO_VISUAL_LEVEL[sizeValue];
      const attrFileOffset = tagFileOffset + tagName.length + staticMatch.index + 1;
      const leadingSpace = staticMatch[1];
      const insertion = `${leadingSpace}visualLevel="${mappedLevel}"`;

      edits.push({
        offset: attrFileOffset,
        index: editCounter++,
        length: staticMatch[0].length,
        insertion,
        log: () =>
          this.logger.info(
            `    Replaced \`size="${sizeValue}"\` with \`visualLevel="${mappedLevel}"\` on \`<${tagName}>\`.`,
          ),
      });
    }

    // Apply accumulated edits in reverse order to prevent index drifting.
    edits.sort((a, b) => {
      if (b.offset !== a.offset) {
        return b.offset - a.offset;
      }
      return b.index - a.index;
    });

    for (const edit of edits) {
      editor.remove(edit.offset, edit.length);
      if (edit.insertion) {
        editor.insertLeft(edit.offset, edit.insertion);
      }
      edit.log?.();
    }
  }
}
