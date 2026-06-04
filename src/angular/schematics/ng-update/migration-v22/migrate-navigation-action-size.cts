import { Migration, ResolvedResource } from '@angular/cdk/schematics';

/**
 * Migration that removes the `size` property from `sbb-navigation-button` and `sbb-navigation-link`.
 */
export class MigrateNavigationActionSize extends Migration<null> {
  enabled = true;

  private readonly TARGET_TAGS = ['sbb-navigation-button', 'sbb-navigation-link'];

  private readonly TAG_PATTERN = new RegExp(
    `<(${this.TARGET_TAGS.join('|')})(\\b[^>]*?)(\\/?)>`,
    'gi',
  );

  private readonly ATTR_PATTERN = /(?<=\s|^)(?:\[?\(?size\)?\]?)\s*(?:=\s*(?:"[^"]*"|'[^']*'))?/i;

  override visitTemplate(template: ResolvedResource): void {
    const editor = this.fileSystem.edit(template.filePath);

    let tagMatch: RegExpExecArray | null;
    this.TAG_PATTERN.lastIndex = 0;

    while ((tagMatch = this.TAG_PATTERN.exec(template.content)) !== null) {
      const [, tagName, attrs] = tagMatch;

      const attrMatch = this.ATTR_PATTERN.exec(attrs);
      if (!attrMatch) {
        continue; // no size attribute present, nothing to do
      }

      const attrFileOffset =
        template.start + tagMatch.index + '<'.length + tagName.length + attrMatch.index - 1;
      editor.remove(attrFileOffset, attrMatch[0].length + 1);
      this.logger.info(`    Removed 'size' attribute from \`<${tagName}>\``);
    }
  }
}
