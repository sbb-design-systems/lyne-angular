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
   */
  protected abstract collectEdits(
    template: ResolvedResource,
    edits: MigrationEdit[],
    nextIndex: () => number,
  ): void;

  override visitTemplate(template: ResolvedResource): void {
    const editor = this.fileSystem.edit(template.filePath);
    const edits: MigrationEdit[] = [];
    let editCounter = 0;
    const nextIndex = (): number => editCounter++;

    this.collectEdits(template, edits, nextIndex);

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
  fileSystem: FileSystem,
  edits: MigrationEdit[],
  index: number,
  template: ResolvedResource,
  tagFileOffset: number,
  message: string,
): void {
  const fullSource = fileSystem.read(template.filePath)?.toString() ?? '';

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
