import { ResolvedResource, FileSystem } from '@angular/cdk/schematics';

export interface MigrationEdit {
  offset: number;
  index: number;
  length: number;
  insertion?: string;
  log?: () => void;
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
