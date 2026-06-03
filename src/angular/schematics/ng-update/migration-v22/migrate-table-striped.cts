import { Migration, ResolvedResource } from '@angular/cdk/schematics';

/**
 * Matches the class `sbb-table` but not `sbb-table--*` modifier classes, so we
 * never double-add the striped class on re-runs.
 */
const SBB_TABLE_PATTERN = /\bsbb-table(?!-)/g;

/**
 * Migration that adds `sbb-table--striped` wherever `sbb-table` is used in a
 * template, restoring the previously-default striped visual style after the
 * table default was changed to unstriped.
 */
export class MigrateTableStriped extends Migration<null> {
  enabled = true;

  override visitTemplate(template: ResolvedResource): void {
    const content = template.content;
    const recorder = this.fileSystem.edit(template.filePath);

    let match: RegExpExecArray | null;
    while ((match = SBB_TABLE_PATTERN.exec(content)) !== null) {
      const tail = content.slice(match.index + match[0].length);

      // Skip if `sbb-table--striped` is already present right after this class.
      if (/^(\s+)sbb-table--striped\b/.test(tail)) {
        continue;
      }

      // Absolute offset within the file (inline templates have start > 0).
      const insertPos = template.start + match.index + match[0].length;
      recorder.insertRight(insertPos, ' sbb-table--striped');
      this.logger.info(`  → Added 'sbb-table--striped' class in ${template.filePath}`);
    }
  }
}
