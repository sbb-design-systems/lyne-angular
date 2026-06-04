import { Migration, ResolvedResource } from '@angular/cdk/schematics';

const SIZE_TO_VISUAL_LEVEL: Record<string, string> = {
  s: '6',
  m: '5',
  l: '4',
};

/**
 * Migration that replaces the `size` property with `visualLevel` on `sbb-journey-header`.
 *
 * Rules:
 * 1. `visualLevel` present: remove `size` unconditionally
 * 2. bound `size`: add FIXME message for manual update, leave untouched
 * 3. static `size`, no `visualLevel`:
 *    a. known value: remove `size`, insert mapped `visualLevel`
 *    b. unknown value: add FIXME message for manual update, leave untouched
 */
export class MigrateJourneyHeaderSize extends Migration<null> {
  enabled = true;

  private readonly TAG_PATTERN = /<(sbb-journey-header)(\b[^>]*?)(\/?)>/gi;

  /** Matches a static size attribute: size="value" or size='value', anchored by whitespace or start of string. */
  private readonly STATIC_SIZE_PATTERN = /(?<=\s|^)size\s*=\s*(?:"(?<dq>[^"]*)"|'(?<sq>[^']*)')/i;

  /** Matches any size attribute, static or bound: size="value", [size]="value", [(size)]="value". */
  private readonly ANY_SIZE_PATTERN = /(?<=\s|^)\[?\(?size\)?\]?\s*=\s*(?:"[^"]*"|'[^']*')/i;

  /** Matches a bound size attribute: [size]="value" or [(size)]="value". */
  private readonly BOUND_SIZE_PATTERN = /\[(?:\(size\)|size)\]\s*=\s*(?:"[^"]*"|'[^']*')/i;

  /** Matches any visualLevel attribute (static or bound). */
  private readonly VISUAL_LEVEL_PRESENT_PATTERN = /\bvisualLevel\b/i;

  override visitTemplate(template: ResolvedResource): void {
    const editor = this.fileSystem.edit(template.filePath);

    let tagMatch: RegExpExecArray | null;
    this.TAG_PATTERN.lastIndex = 0;

    while ((tagMatch = this.TAG_PATTERN.exec(template.content)) !== null) {
      const [, tagName, attrs] = tagMatch;
      const tagFileOffset = template.start + tagMatch.index;

      // Rule #1
      if (this.VISUAL_LEVEL_PRESENT_PATTERN.test(attrs)) {
        const sizeMatch = this.ANY_SIZE_PATTERN.exec(attrs);
        if (!sizeMatch) {
          continue; // no size attribute present, nothing to do
        }
        const attrFileOffset = tagFileOffset + '<'.length + tagName.length + sizeMatch.index - 1;
        editor.remove(attrFileOffset, sizeMatch[0].length + 1);
        this.logger.info(
          `    Removed \`size\` attribute from \`<${tagName}>\` (visualLevel already present).`,
        );
        continue;
      }

      // Rule #2
      if (this.BOUND_SIZE_PATTERN.test(attrs)) {
        this.logger.warn(
          `    FIXME: bound \`size\` attribute on \`<${tagName}>\` could not be migrated automatically.`,
        );
        this._insertFixmeComment(
          editor,
          template,
          tagFileOffset,
          `FIXME: bound \`size\` on \`<${tagName}>\` must be migrated manually to \`visualLevel\``,
        );
        continue;
      }

      // Rule #3
      const staticMatch = this.STATIC_SIZE_PATTERN.exec(attrs);
      if (!staticMatch) {
        continue; // no size attribute present, nothing to do
      }

      const sizeValue = (staticMatch.groups?.['dq'] ?? staticMatch.groups?.['sq'] ?? '').trim();
      const mappedLevel = SIZE_TO_VISUAL_LEVEL[sizeValue];

      // Rule #3b
      if (!mappedLevel) {
        this.logger.warn(
          `    FIXME: \`size="${sizeValue}"\` on \`<${tagName}>\` could not be mapped to \`visualLevel\` automatically.`,
        );
        this._insertFixmeComment(
          editor,
          template,
          tagFileOffset,
          `FIXME: \`size="${sizeValue}"\` on \`<${tagName}>\` could not be mapped to \`visualLevel\` automatically`,
        );
        continue;
      }

      // Rule 3a
      const attrFileOffset = tagFileOffset + '<'.length + tagName.length + staticMatch.index;
      const insertion = `visualLevel="${mappedLevel}"`;

      editor.remove(attrFileOffset, staticMatch[0].length);
      editor.insertLeft(attrFileOffset, insertion);

      this.logger.info(
        `    Replaced \`size="${sizeValue}"\` with \`${insertion}\` on \`<${tagName}>\`.`,
      );
    }
  }

  /**
   * Inserts a FIXME message for manual update when the size is bound or unmapped.
   * Handles both inline and external templates.
   */
  private _insertFixmeComment(
    editor: ReturnType<typeof this.fileSystem.edit>,
    template: ResolvedResource,
    tagFileOffset: number,
    message: string,
  ): void {
    if (template.inline) {
      const fullSource = this.fileSystem.read(template.filePath) ?? '';
      let lineStart = template.start;
      while (lineStart > 0 && fullSource[lineStart - 1] !== '\n') {
        lineStart--;
      }
      editor.insertLeft(lineStart, `  // ${message}\n`);
    } else {
      editor.insertLeft(tagFileOffset, `<!-- ${message} -->\n`);
    }
  }
}
