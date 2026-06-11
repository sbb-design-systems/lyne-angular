import { ResolvedResource } from '@angular/cdk/schematics';
import {
  AttributeMigrationBase,
  MigrationEdit,
  queueFixmeComment,
} from './attribute-migration-base.cjs';

/**
 * Migration that removes `alignSelf` or `align-self` properties from buttons and adds a comment to check layout styles manually.
 */
export class MigrateButtonAlignSelf extends AttributeMigrationBase {
  private get TAG_PATTERN(): RegExp {
    const tags = [
      'sbb-accent-button',
      'sbb-accent-button-static',
      'sbb-button',
      'sbb-button-static',
      'sbb-secondary-button',
      'sbb-secondary-button-static',
      'sbb-transparent-button',
      'sbb-transparent-button-static',
      'sbb-accent-button-link',
      'sbb-button-link',
      'sbb-secondary-button-link',
      'sbb-transparent-button-link',
    ];
    // Sort descending by length to ensure longer names match first in the alternation group
    const sortedTags = [...tags].sort((a, b) => b.length - a.length);
    return new RegExp(`<(${sortedTags.join('|')})(\\b[^>]*?)>`, 'gi');
  }

  /**
   * Matches static, property-bound, and attribute-bound forms of alignSelf and align-self.
   */
  private get ALIGN_SELF_PATTERN(): RegExp {
    return /(\s+)(?:\[\(?(alignSelf|align-self)\)?\]|\[attr\.(alignSelf|align-self)\]|(alignSelf|align-self))(?=\s|=|\$)(?:\s*=\s*(?:"[^"]*"|'[^']*'))?/i;
  }

  protected override collectEdits(
    template: ResolvedResource,
    edits: MigrationEdit[],
    nextIndex: () => number,
    fullSource: string,
  ): void {
    const tagPattern = this.TAG_PATTERN;
    let tagMatch: RegExpExecArray | null;

    while ((tagMatch = tagPattern.exec(template.content)) !== null) {
      const [, tagName, attrs] = tagMatch;
      const tagFileOffset = template.start + tagMatch.index;
      const tagNameEndOffset = tagFileOffset + 1 + tagName.length;

      const pattern = this.ALIGN_SELF_PATTERN;
      const attrMatch = pattern.exec(attrs);

      if (attrMatch) {
        const matchedName = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4];

        edits.push({
          offset: tagNameEndOffset + attrMatch.index,
          index: nextIndex(),
          length: attrMatch[0].length,
          log: () =>
            this.logger.info(`    Removed \`${matchedName}\` attribute from \`<${tagName}>\``),
        });

        queueFixmeComment(
          fullSource,
          edits,
          nextIndex(),
          template,
          tagFileOffset,
          `FIXME: '${matchedName}' has been removed. Check you style by referring to https://lyne-angular.app.sbb.ch/angular/guides/layout#flex .`,
        );
      }
    }
  }
}
