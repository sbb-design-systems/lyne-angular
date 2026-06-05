import { ResolvedResource } from '@angular/cdk/schematics';

import { AttributeMigrationBase, MigrationEdit } from './attribute-migration-base.cjs';

/**
 * Migration that removes the `size` property from `sbb-navigation-button` and `sbb-navigation-link`.
 */
export class MigrateNavigationActionSize extends AttributeMigrationBase {
  private get TAG_PATTERN(): RegExp {
    return /<(sbb-navigation-button|sbb-navigation-link)(\b[^>]*?)(\/?)>/gi;
  }

  /**
   * Matches size attribute variations, capturing leading whitespace.
   * Handles: size, [size], [(size)], and [attr.size] variants.
   */
  private readonly ATTR_PATTERN = /(\s+)(?:\[?\(?(?:attr\.)?size\)?\]?)\s*=\s*(?:"[^"]*"|'[^']*')/i;

  protected override collectEdits(
    template: ResolvedResource,
    edits: MigrationEdit[],
    nextIndex: () => number,
    _fullSource: string,
  ): void {
    const tagPattern = this.TAG_PATTERN;

    let tagMatch: RegExpExecArray | null;
    while ((tagMatch = tagPattern.exec(template.content)) !== null) {
      const [, tagName, attrs] = tagMatch;
      const tagNameEndOffset = template.start + tagMatch.index + 1 + tagName.length;

      const attrMatch = this.ATTR_PATTERN.exec(attrs);
      if (!attrMatch) {
        continue;
      }

      edits.push({
        offset: tagNameEndOffset + attrMatch.index,
        index: nextIndex(),
        length: attrMatch[0].length,
        log: () => this.logger.info(`    Removed 'size' attribute from \`<${tagName}>\``),
      });
    }
  }
}
