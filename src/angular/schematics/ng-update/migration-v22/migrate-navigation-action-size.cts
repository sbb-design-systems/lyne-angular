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

  private readonly ATTR_PATTERN = /(?<=\s|^)(?:\[?\(?size\)?\]?)\s*(?:=\s*(?:"[^"]*"|'[^']*'))?/gi;

  override visitTemplate(template: ResolvedResource): void {
    let changed = false;

    const updated = template.content.replace(
      this.TAG_PATTERN,
      (_match, tagName: string, attrs: string, selfClose: string) => {
        const cleaned = attrs.replace(this.ATTR_PATTERN, '');
        if (cleaned === attrs) {
          return _match;
        }

        changed = true;
        const attrsOut = cleaned.trim();
        const gap = attrsOut.length > 0 ? ' ' : '';

        this.logger.info(`    Removed 'size' attribute from \`<${tagName}>\``);

        return `<${tagName}${gap}${attrsOut}${selfClose}>`;
      },
    );

    if (changed) {
      this.fileSystem
        .edit(template.filePath)
        .remove(template.start, template.content.length)
        .insertRight(template.start, updated);
    }
  }
}
