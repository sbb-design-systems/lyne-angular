import { ResolvedResource } from '@angular/cdk/schematics';

import { AttributeMigrationBase, MigrationEdit } from './attribute-migration-base.cjs';

/**
 * Migration that removes `orientation`, `alignGroup`, `horizontalFrom`, `buttonSize` and `linkSize`
 * properties from `sbb-action-group` and `sbb-dialog-actions`.
 */
export class MigrateActionGroupProperties extends AttributeMigrationBase {
  private get TAG_PATTERN(): RegExp {
    return /<(sbb-action-group|sbb-dialog-actions)(\b[^>]*?)(\/?)>/gi;
  }

  private get ATTR_PATTERN(): RegExp {
    return /(\s+)(?:\[?\(?(?:attr\.)?(?:orientation|alignGroup|horizontalFrom|buttonSize|linkSize)\)?\]?)(?=\s|=|>|\/)\s*(?:=\s*(?:"[^"]*"|'[^']*'))?/gi;
  }

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

      // A single tag may carry more than one of the removed attributes, so we
      // scan attrs repeatedly via /g until no further match is found.
      const attrPattern = this.ATTR_PATTERN;
      let attrMatch: RegExpExecArray | null;

      while ((attrMatch = attrPattern.exec(attrs)) !== null) {
        // Extract the bare attribute name for logging.
        const attrName =
          attrMatch[0].match(
            /\b(orientation|alignGroup|horizontalFrom|buttonSize|linkSize)\b/i,
          )?.[1] ?? attrMatch[0].trim();

        edits.push({
          offset: tagNameEndOffset + attrMatch.index,
          index: nextIndex(),
          length: attrMatch[0].length,
          log: () =>
            this.logger.info(`    Removed \`${attrName}\` attribute from \`<${tagName}>\``),
        });
      }
    }
  }
}
