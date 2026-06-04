import { ResolvedResource } from '@angular/cdk/schematics';

import { AttributeMigrationBase, MigrationEdit } from './attribute-migration-base.cjs';

/**
 * Migration that removes `orientation`, `alignGroup`, `horizontalFrom`, `buttonSize and `linkSize` properties
 * from `sbb-action-group` and `sbb-dialog-actions`.
 */
export class MigrateActionGroupProperties extends AttributeMigrationBase {
  private readonly TAG_PATTERN = /<(sbb-action-group|sbb-dialog-actions)(\b[^>]*?)(\/?)>/gi;

  /**
   * Matches any of the removed attributes in all their Angular forms, capturing leading whitespace.
   */
  private readonly ATTR_PATTERN =
    /(\s+)(?:\[?\(?(?:attr\.)?(?:orientation|alignGroup|horizontalFrom|buttonSize|linkSize)\)?\]?)(?=\s|=|>|\/)\s*(?:=\s*(?:"[^"]*"|'[^']*'))?/gi;

  protected override collectEdits(
    template: ResolvedResource,
    edits: MigrationEdit[],
    nextIndex: () => number,
  ): void {
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
          index: nextIndex(),
          length: attrMatch[0].length,
          log: () =>
            this.logger.info(`    Removed \`${attrName}\` attribute from \`<${tagName}>\``),
        });
      }
    }
  }
}
