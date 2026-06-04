import { Migration, ResolvedResource } from '@angular/cdk/schematics';
import { MigrationEdit, queueFixmeComment } from './migration-utils.cjs';

/**
 * Migration that manages the transition of the `expandFrom` attribute to `hideLabelBelow`
 * on <sbb-header-button> and <sbb-header-link> components.
 */
export class MigrateHeaderActionExpandFrom extends Migration<null> {
  enabled = true;

  private readonly TAG_PATTERN = /<(sbb-header-button|sbb-header-link)(\b[^>]*?)(\/?)>/gi;

  /** Matches ONLY strictly static expandFrom="value" (capturing leading whitespace). */
  private readonly STATIC_EXPAND_FROM_PATTERN =
    /(\s+)expandFrom\s*=\s*(?:"(?<dq>[^"]*)"|'(?<sq>[^']*)')/i;

  /** Matches bound expandFrom forms, now explicitly including [attr.expandFrom] variants. */
  private readonly BOUND_EXPAND_FROM_PATTERN =
    /\[\(?(?:attr\.)?expandFrom\)?\]\s*=\s*(?:"[^"]*"|'[^']*')/i;

  /** Matches any form of expandFrom to identify its presence. */
  private readonly ANY_EXPAND_FROM_PATTERN =
    /\[?\(?(?:attr\.)?expandFrom\)?\]?\s*=\s*(?:"[^"]*"|'[^']*')/i;

  override visitTemplate(template: ResolvedResource): void {
    const editor = this.fileSystem.edit(template.filePath);
    const edits: MigrationEdit[] = [];
    let editCounter = 0;

    let tagMatch: RegExpExecArray | null;
    this.TAG_PATTERN.lastIndex = 0;

    while ((tagMatch = this.TAG_PATTERN.exec(template.content)) !== null) {
      const [, tagName, attrs] = tagMatch;
      const tagFileOffset = template.start + tagMatch.index;

      const hasExpandFrom = this.ANY_EXPAND_FROM_PATTERN.test(attrs);

      // Rule #1: no expandFrom -> add hideLabelBelow
      if (!hasExpandFrom) {
        const insertionOffset = tagFileOffset + tagName.length + 1;
        edits.push({
          offset: insertionOffset,
          index: editCounter++,
          length: 0,
          insertion: ` hideLabelBelow="large"`,
          log: () =>
            this.logger.info(
              `    Added \`hideLabelBelow="large"\` to \`<${tagName}>\` (no expandFrom present).`,
            ),
        });
        continue;
      }

      // Rule #2: bound expandFrom -> add FIXME message for manual update, leave untouched
      if (this.BOUND_EXPAND_FROM_PATTERN.test(attrs)) {
        this.logger.warn(
          `    FIXME: bound or attribute-bound \`expandFrom\` on \`<${tagName}>\` could not be migrated automatically.`,
        );
        queueFixmeComment(
          this.fileSystem,
          edits,
          editCounter++,
          template,
          tagFileOffset,
          `FIXME: bound \`expandFrom\` on \`<${tagName}>\` must be migrated manually to \`hideLabelBelow\``,
        );
        continue;
      }

      // Rule #3: static expandFrom
      const staticMatch = this.STATIC_EXPAND_FROM_PATTERN.exec(attrs);
      if (!staticMatch) {
        continue;
      }

      const attrFileOffset = tagFileOffset + tagName.length + staticMatch.index + 1;
      const leadingSpace = staticMatch[1];
      const expandFromValue = (
        staticMatch.groups?.['dq'] ??
        staticMatch.groups?.['sq'] ??
        ''
      ).trim();

      if (expandFromValue === 'zero') {
        // Rule #3a: value is exactly "zero" -> remove expandFrom completely
        edits.push({
          offset: attrFileOffset,
          index: editCounter++,
          length: staticMatch[0].length,
          log: () =>
            this.logger.info(
              `    Removed \`expandFrom\` attribute from \`<${tagName}>\` (value was zero).`,
            ),
        });
      } else {
        // Rule #3b: value is not "zero" -> remove expandFrom, add hideLabelBelow with same value
        const insertion = `${leadingSpace}hideLabelBelow="${expandFromValue}"`;
        edits.push({
          offset: attrFileOffset,
          index: editCounter++,
          length: staticMatch[0].length,
          insertion,
          log: () =>
            this.logger.info(
              `    Migrated \`expandFrom="${expandFromValue}"\` to \`hideLabelBelow="${expandFromValue}"\` on \`<${tagName}>\`.`,
            ),
        });
      }
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
