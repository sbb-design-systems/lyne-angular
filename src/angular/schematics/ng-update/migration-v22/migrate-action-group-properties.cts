import { Migration, ResolvedResource } from '@angular/cdk/schematics';
import { MigrationEdit } from './migration-utils.cjs';

/**
 * Migration that removes `orientation`, `alignGroup`, `horizontalFrom`, `buttonSize and `linkSize` properties
 * from `sbb-action-group` and `sbb-dialog-actions`.
 */
export class MigrateActionGroupProperties extends Migration<null> {
  enabled = true;

  private readonly TAG_PATTERN = /<(sbb-action-group|sbb-dialog-actions)(\b[^>]*?)(\/?)>/gi;

  /**
   * Matches any of the removed attributes in all their Angular forms, capturing leading whitespace.
   */
  private readonly ATTR_PATTERN =
    /(\s+)(?:\[?\(?(?:attr\.)?(?:orientation|alignGroup|horizontalFrom|buttonSize|linkSize)\)?\]?)(?=\s|=|>|\/)\s*(?:=\s*(?:"[^"]*"|'[^']*'))?/gi;

  override visitTemplate(template: ResolvedResource): void {
    const editor = this.fileSystem.edit(template.filePath);
    const edits: MigrationEdit[] = [];
    let editCounter = 0;

    let tagMatch: RegExpExecArray | null;
    this.TAG_PATTERN.lastIndex = 0;

    while ((tagMatch = this.TAG_PATTERN.exec(template.content)) !== null) {
      const [, tagName, attrs] = tagMatch;
      const tagFileOffset = template.start + tagMatch.index;

      // A single tag may carry more than one of the removed attributes, so we
      // scan attrs repeatedly via /g until no further match is found.
      this.ATTR_PATTERN.lastIndex = 0;
      let attrMatch: RegExpExecArray | null;

      while ((attrMatch = this.ATTR_PATTERN.exec(attrs)) !== null) {
        const attrFileOffset = tagFileOffset + tagName.length + 1 + attrMatch.index;

        // Extract the bare attribute name for logging by finding the known name within the match.
        const attrName =
          attrMatch[0].match(
            /\b(orientation|alignGroup|horizontalFrom|buttonSize|linkSize)\b/i,
          )?.[1] ?? attrMatch[0].trim();

        edits.push({
          offset: attrFileOffset,
          index: editCounter++,
          length: attrMatch[0].length,
          log: () =>
            this.logger.info(`    Removed \`${attrName}\` attribute from \`<${tagName}>\``),
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
      edit.log?.();
    }
  }
}
