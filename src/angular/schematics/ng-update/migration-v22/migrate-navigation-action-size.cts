import { Migration, ResolvedResource } from '@angular/cdk/schematics';
import { MigrationEdit } from './migration-utils.cjs';

/**
 * Migration that removes the `size` property from `sbb-navigation-button` and `sbb-navigation-link`.
 */
export class MigrateNavigationActionSize extends Migration<null> {
  enabled = true;

  private readonly TAG_PATTERN = /<(sbb-navigation-button|sbb-navigation-link)(\b[^>]*?)(\/?)>/gi;

  /**
   * Matches size attribute variations, capturing leading whitespace.
   * Handles: size, [size], [(size)], [attr.size], and valueless variants.
   */
  private readonly ATTR_PATTERN =
    /(\s+)(?:\[?\(?(?:attr\.)?size\)?\]?)\s*(?:=\s*(?:"[^"]*"|'[^']*'))?/i;

  override visitTemplate(template: ResolvedResource): void {
    const editor = this.fileSystem.edit(template.filePath);
    const edits: MigrationEdit[] = [];
    let editCounter = 0;

    let tagMatch: RegExpExecArray | null;
    this.TAG_PATTERN.lastIndex = 0;

    while ((tagMatch = this.TAG_PATTERN.exec(template.content)) !== null) {
      const [, tagName, attrs] = tagMatch;

      const attrMatch = this.ATTR_PATTERN.exec(attrs);
      if (!attrMatch) {
        continue;
      }

      const attrFileOffset = template.start + tagMatch.index + tagName.length + attrMatch.index + 1;

      edits.push({
        offset: attrFileOffset,
        index: editCounter++,
        length: attrMatch[0].length,
        log: () => this.logger.info(`    Removed 'size' attribute from \`<${tagName}>\``),
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
      edit.log?.();
    }
  }
}
