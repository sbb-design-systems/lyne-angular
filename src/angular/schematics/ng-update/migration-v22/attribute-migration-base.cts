import { FileSystem, Migration, ResolvedResource } from '@angular/cdk/schematics';

export interface MigrationEdit {
  offset: number;
  index: number;
  length: number;
  insertion?: string;
  log?: () => void;
}

/**
 * Base class for attribute-level template migrations.
 *
 * Subclasses implement `collectEdits()` to describe which attributes to
 * remove or replace; this class handles the boilerplate of obtaining the
 * editor, sorting edits in reverse-offset order, and applying them.
 */
export abstract class AttributeMigrationBase extends Migration<null> {
  enabled = true;

  /**
   * Inspect `template` and push any required edits into `edits`.
   * Use `nextIndex()` to obtain a stable sort-tiebreaker for each edit.
   * `fullSource` is the raw file content, pre-read once for the template's file.
   */
  protected abstract collectEdits(
    template: ResolvedResource,
    edits: MigrationEdit[],
    nextIndex: () => number,
    fullSource: string,
  ): void;

  override visitTemplate(template: ResolvedResource): void {
    const editor = this.fileSystem.edit(template.filePath);
    const edits: MigrationEdit[] = [];
    let editCounter = 0;
    const nextIndex = (): number => editCounter++;

    // Read once here; passed to collectEdits and queueFixmeComment to avoid
    // repeated disk reads when multiple tags in the same template trigger FIXMEs.
    const fullSource = this.fileSystem.read(template.filePath)?.toString() ?? '';

    this.collectEdits(template, edits, nextIndex, fullSource);

    // Apply in reverse offset order to prevent earlier removals from shifting
    // the byte positions of later edits in the same file.
    edits.sort((a, b) => b.offset - a.offset || b.index - a.index);

    for (const edit of edits) {
      editor.remove(edit.offset, edit.length);
      if (edit.insertion) {
        editor.insertLeft(edit.offset, edit.insertion);
      }
      edit.log?.();
    }
  }
}

/**
 * Queues a FIXME comment.
 * Places it above the `template:` property for inline templates,
 * or directly above the HTML element for external template files.
 */
export function queueFixmeComment(
  fullSource: string,
  edits: MigrationEdit[],
  index: number,
  template: ResolvedResource,
  tagFileOffset: number,
  message: string,
): void {
  if (template.inline) {
    let lineStart = template.start;
    while (lineStart > 0 && fullSource[lineStart - 1] !== '\n') {
      lineStart--;
    }

    const indentation = fullSource.slice(lineStart, template.start).match(/^\s*/)?.[0] ?? '  ';
    edits.push({
      offset: lineStart,
      index,
      length: 0,
      insertion: `${indentation}// ${message}\n`,
    });
  } else {
    let lineStart = tagFileOffset;
    while (lineStart > 0 && fullSource[lineStart - 1] !== '\n') {
      lineStart--;
    }

    const indentation = fullSource.slice(lineStart, tagFileOffset).match(/^\s*/)?.[0] ?? '';
    edits.push({
      offset: lineStart,
      index,
      length: 0,
      insertion: `${indentation}<!-- ${message} -->\n`,
    });
  }
}
