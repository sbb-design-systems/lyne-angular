/**
 * Framework independent helpers to render and place source comments.
 *
 * Shared by the `ng update` comment migrations (`AddCommentBase`, running on the CDK migration runner)
 * and the `migrate-legacy` comment rule (running as a plain schematic rule).
 */

/** Used to specify different comment delimiters for different file extensions. */
export interface CommentDelimiters {
  start: string;
  end: string;
}

export const TS_DELIMITERS: CommentDelimiters = { start: '//', end: '' };
export const HTML_DELIMITERS: CommentDelimiters = { start: '<!--', end: '-->' };
export const CSS_DELIMITERS: CommentDelimiters = { start: '/*', end: ' */' };

/** Formats a comment body, supporting both single-line and multiline comment text. */
export function formatComment(
  indent: string,
  delimiters: CommentDelimiters,
  commentText: string,
): string {
  let renderedLineIndex = 0;
  return (
    commentText
      .split('\n')
      .map((line) => {
        const trimmedLine = line.trim();
        // Skip emitting completely empty lines to prevent trailing whitespace issues
        if (!trimmedLine) {
          return '';
        }

        // Add an extra space prefix ONLY from the 2nd actual text line onwards
        const linePrefix = renderedLineIndex > 0 ? ' ' : '';
        renderedLineIndex++;

        const body = delimiters.end
          ? `${delimiters.start} ${linePrefix}${trimmedLine} ${delimiters.end}`
          : `${delimiters.start} ${linePrefix}${trimmedLine}`;
        return `${indent}${body}`;
      })
      // Filter out empty strings from skipped empty lines
      .filter((line) => line !== '')
      .join('\n')
  );
}

/** Returns the offset of the first character of the line containing `offset`. */
export function getLineStart(text: string, offset: number): number {
  return Math.max(0, text.lastIndexOf('\n', offset - 1) + 1);
}

/** Returns the leading whitespace of the line starting at `lineStart`. */
export function getIndent(text: string, lineStart: number): string {
  const lineEnd = text.indexOf('\n', lineStart);
  const line = text.slice(lineStart, lineEnd === -1 ? text.length : lineEnd);
  return line.match(/^\s*/)?.[0] ?? '';
}

/**
 * Returns the (trimmed) comment lines placed directly above the line starting
 * at `lineStart`. Collection stops at the first line which is not a comment.
 *
 * Used to keep comment migrations idempotent.
 */
export function getCommentLinesAbove(
  text: string,
  lineStart: number,
  delimiters: CommentDelimiters,
): Set<string> {
  const lines = new Set<string>();
  let end = lineStart - 1;

  while (end > 0) {
    const start = getLineStart(text, end);
    const line = text.slice(start, end).replace(/\r$/, '').trim();
    if (!line.startsWith(delimiters.start)) {
      break;
    }
    lines.add(line);
    end = start - 1;
  }

  return lines;
}

/**
 * Tracks the lines which already received a comment, so a line never gets more
 * than one comment block per migration run, even if several matches share it.
 */
export class ProcessedLines {
  private readonly _lines = new Map<string, Set<number>>();

  has(fileName: string, lineStart: number): boolean {
    return !!this._lines.get(fileName)?.has(lineStart);
  }

  add(fileName: string, lineStart: number): void {
    let set = this._lines.get(fileName);
    if (!set) {
      set = new Set<number>();
      this._lines.set(fileName, set);
    }
    set.add(lineStart);
  }
}
