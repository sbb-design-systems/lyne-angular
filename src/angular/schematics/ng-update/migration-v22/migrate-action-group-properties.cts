import { ResolvedResource } from '@angular/cdk/schematics';

import { AttributeMigrationBase, MigrationEdit } from './attribute-migration-base.cjs';

const BUTTON_TAGS = [
  'sbb-accent-button',
  'sbb-accent-button-static',
  'sbb-button',
  'sbb-button-static',
  'sbb-secondary-button',
  'sbb-secondary-button-static',
  'sbb-transparent-button',
  'sbb-transparent-button-static',
];

const LINK_TAGS = [
  'sbb-accent-button-link',
  'sbb-button-link',
  'sbb-secondary-button-link',
  'sbb-transparent-button-link',
];

/**
 * Migration that removes `orientation`, `alignGroup`, `horizontalFrom`, `buttonSize` and `linkSize`
 * properties from `sbb-action-group` and `sbb-dialog-actions`.
 * The `buttonSize` and `linkSize` properties are proxied to the inner buttons/links before removal.
 */
export class MigrateActionGroupProperties extends AttributeMigrationBase {
  private get TAG_PATTERN(): RegExp {
    return /<(sbb-action-group|sbb-dialog-actions)(\b[^>]*?)>/gi;
  }

  private get OTHER_ATTRS_PATTERN(): RegExp {
    return /(\s+)(?:\[\(?(?:orientation|alignGroup|horizontalFrom)\)?\]|\[attr\.(?:orientation|alignGroup|horizontalFrom)\]|(?:orientation|alignGroup|horizontalFrom))(?=\s|=|\$)(?:\s*=\s*(?:"[^"]*"|'[^']*'))?/gi;
  }

  /** Matches ONLY strictly static buttonSize="value" (capturing leading whitespace). */
  private readonly STATIC_BUTTON_SIZE_PATTERN =
    /(\s+)buttonSize\s*=\s*(?:"(?<dq>[^"]*)"|'(?<sq>[^']*)')/i;

  /**
   * Matches valid bound buttonSize forms (capturing leading whitespace for boundary consistency).
   * Targets [buttonSize] and [attr.buttonSize].
   */
  private readonly BOUND_BUTTON_SIZE_PATTERN =
    /(\s+)(?:\[\(?buttonSize\)?\]|\[attr\.buttonSize\])\s*=\s*(?:"(?<dq>[^"]*)"|'(?<sq>[^']*)')/i;

  /** Matches ONLY strictly static linkSize="value" (capturing leading whitespace). */
  private readonly STATIC_LINK_SIZE_PATTERN =
    /(\s+)linkSize\s*=\s*(?:"(?<dq>[^"]*)"|'(?<sq>[^']*)')/i;

  /**
   * Matches valid bound buttonSize forms (capturing leading whitespace for boundary consistency).
   * Targets [linkSize] and [attr.linkSize].
   */
  private readonly BOUND_LINK_SIZE_PATTERN =
    /(\s+)(?:\[\(?linkSize\)?\]|\[attr\.linkSize\])\s*=\s*(?:"(?<dq>[^"]*)"|'(?<sq>[^']*)')/i;

  /**
   * Matches any valid form of size (static or bound) to identify its presence.
   * Leading \s+ ensures we don't match 'size' inside an attribute value string.
   */
  private readonly EXISTING_SIZE_PATTERN =
    /(\s+)(?:\[\(?size\)?\]|\[attr\.size\]|size)\s*=\s*(?:"[^"]*"|'[^']*')/i;

  protected override collectEdits(
    template: ResolvedResource,
    edits: MigrationEdit[],
    nextIndex: () => number,
    _fullSource: string,
  ): void {
    const tagPattern = this.TAG_PATTERN;

    let tagMatch: RegExpExecArray | null;
    while ((tagMatch = tagPattern.exec(template.content)) !== null) {
      const [fullOpenTag, tagName, attrs] = tagMatch;
      const tagFileOffset = template.start + tagMatch.index;
      const tagNameEndOffset = tagFileOffset + 1 + tagName.length;

      const openTagEnd = tagMatch.index + fullOpenTag.length;
      const extracted = this._extractInnerContent(template.content, tagName, openTagEnd);
      const innerContent = extracted?.inner ?? null;
      const innerContentFileOffset = extracted
        ? template.start + extracted.innerFileOffset
        : template.start + openTagEnd;

      const sizeConfigs = [
        {
          name: 'buttonSize',
          tags: BUTTON_TAGS,
          bound: this.BOUND_BUTTON_SIZE_PATTERN,
          static: this.STATIC_BUTTON_SIZE_PATTERN,
        },
        {
          name: 'linkSize',
          tags: LINK_TAGS,
          bound: this.BOUND_LINK_SIZE_PATTERN,
          static: this.STATIC_LINK_SIZE_PATTERN,
        },
      ];

      for (const config of sizeConfigs) {
        const boundMatch = config.bound.exec(attrs);
        const staticMatch = !boundMatch ? config.static.exec(attrs) : null;
        const sizeMatch = boundMatch ?? staticMatch;

        if (sizeMatch && innerContent !== null) {
          const sizeValue = (sizeMatch.groups?.['dq'] ?? sizeMatch.groups?.['sq'] ?? '').trim();
          const sizeAttr = `${boundMatch ? '[size]' : 'size'}="${sizeValue}"`;

          this._propagateSizeToChildren(
            config.tags,
            innerContent,
            innerContentFileOffset,
            sizeAttr,
            edits,
            nextIndex,
          );

          // Queue host attribute removal
          edits.push({
            offset: tagNameEndOffset + sizeMatch.index,
            index: nextIndex(),
            length: sizeMatch[0].length,
            log: () =>
              this.logger.info(
                `    Removed \`${config.name}\` from \`<${tagName}>\` (propagated to children as \`${sizeAttr}\`).`,
              ),
          });
        }
      }

      // Remove general configuration layout attributes (orientation, alignGroup, etc.)
      const otherAttrsPattern = this.OTHER_ATTRS_PATTERN;
      let attrMatch: RegExpExecArray | null;
      while ((attrMatch = otherAttrsPattern.exec(attrs)) !== null) {
        const attrName =
          attrMatch[0].match(/\b(orientation|alignGroup|horizontalFrom)\b/i)?.[1] ??
          attrMatch[0].trim();
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

  private _extractInnerContent(
    content: string,
    tagName: string,
    openTagEnd: number,
  ): { inner: string; innerFileOffset: number } | null {
    const openPattern = new RegExp(`<${tagName}\\b[^>]*?>`, 'gi');
    const closePattern = new RegExp(`<\\/${tagName}>`, 'gi');

    let depth = 1;
    let cursor = openTagEnd;

    while (depth > 0 && cursor < content.length) {
      openPattern.lastIndex = cursor;
      closePattern.lastIndex = cursor;

      const nextOpen = openPattern.exec(content);
      const nextClose = closePattern.exec(content);

      if (!nextClose) {
        return null;
      }

      if (nextOpen && nextOpen.index < nextClose.index) {
        depth++;
        cursor = nextOpen.index + nextOpen[0].length;
      } else {
        depth--;
        if (depth === 0) {
          return {
            inner: content.slice(openTagEnd, nextClose.index),
            innerFileOffset: openTagEnd,
          };
        }
        cursor = nextClose.index + nextClose[0].length;
      }
    }
    return null;
  }

  private _propagateSizeToChildren(
    targetTags: string[],
    innerContent: string,
    innerContentFileOffset: number,
    sizeAttr: string,
    edits: MigrationEdit[],
    nextIndex: () => number,
  ): void {
    // Sort tags by length descending so longer tags match before substring counterparts
    const sortedTags = [...targetTags].sort((a, b) => b.length - a.length);
    const childTagPattern = new RegExp(`<(${sortedTags.join('|')})(\\b[^>]*?)(?:\/?)>`, 'gi');
    let childMatch: RegExpExecArray | null;

    while ((childMatch = childTagPattern.exec(innerContent)) !== null) {
      const [, childTagName, childAttrs] = childMatch;
      const childTagNameEndOffset =
        innerContentFileOffset + childMatch.index + 1 + childTagName.length;
      const existingSizeMatch = this.EXISTING_SIZE_PATTERN.exec(childAttrs);

      if (existingSizeMatch) {
        const leadingSpace = existingSizeMatch[1];
        edits.push({
          offset: childTagNameEndOffset + existingSizeMatch.index,
          index: nextIndex(),
          length: existingSizeMatch[0].length,
          insertion: `${leadingSpace}${sizeAttr}`,
          log: () =>
            this.logger.info(
              `    Replaced existing \`size\` with \`${sizeAttr}\` on \`<${childTagName}>\`.`,
            ),
        });
      } else {
        edits.push({
          offset: childTagNameEndOffset,
          index: nextIndex(),
          length: 0,
          insertion: ` ${sizeAttr}`,
          log: () =>
            this.logger.info(
              `    Added \`${sizeAttr}\` to \`<${childTagName}>\` (propagated from parent).`,
            ),
        });
      }
    }
  }
}
