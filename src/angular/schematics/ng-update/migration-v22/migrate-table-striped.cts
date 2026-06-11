import { ResolvedResource } from '@angular/cdk/schematics';
import { AttributeMigrationBase, MigrationEdit } from './attribute-migration-base.cjs';

/**
 * Checks for a standalone 'sbb-table' class name (ignoring modifier variants like sbb-table--*)
 */
const SBB_TABLE_CLASS_NAME_REGEX = /\bsbb-table(?!-)\b/i;

/**
 * Checks if the striped class variant is already present anywhere in the class list
 */
const STRIPED_ALREADY_PRESENT_REGEX = /\bsbb-table--striped\b/i;

/**
 * Migration that adds `sbb-table--striped` wherever `sbb-table` is used in a class attribute,
 * restoring the previously-default striped visual style.
 */
export class MigrateTableStriped extends AttributeMigrationBase {
  /**
   * Matches standard HTML class attributes with single or double quotes:
   * e.g., class="sbb-table test" or class='test sbb-table'
   */
  private get CLASS_ATTRIBUTE_PATTERN(): RegExp {
    return /\bclass\s*=\s*(["'])(.*?)\1/gi;
  }

  protected override collectEdits(
    template: ResolvedResource,
    edits: MigrationEdit[],
    nextIndex: () => number,
    _fullSource: string,
  ): void {
    const pattern = this.CLASS_ATTRIBUTE_PATTERN;
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(template.content)) !== null) {
      const [fullClassAttr, , classListContent] = match;

      // 1. Verify 'sbb-table' exists as a standalone class and find its exact match position
      const subMatch = SBB_TABLE_CLASS_NAME_REGEX.exec(fullClassAttr);
      if (!subMatch) {
        continue;
      }

      // 2. Skip if 'sbb-table--striped' is already mixed into this class attribute
      if (STRIPED_ALREADY_PRESENT_REGEX.test(classListContent)) {
        continue;
      }

      // 3. Target the position directly after the 'sbb-table' class token instead of the end of the attribute
      const insertOffset = template.start + match.index + subMatch.index + subMatch[0].length;

      edits.push({
        offset: insertOffset,
        index: nextIndex(),
        length: 0,
        insertion: ' sbb-table--striped',
        log: () =>
          this.logger.info(`  → Added 'sbb-table--striped' class to table in ${template.filePath}`),
      });
    }
  }
}
