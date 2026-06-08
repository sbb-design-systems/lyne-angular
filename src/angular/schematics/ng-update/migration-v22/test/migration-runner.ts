import type { Migration, ResolvedResource, WorkspacePath } from '@angular/cdk/schematics';
import * as ts from 'typescript';
import { vi } from 'vitest';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RunMigrationOptions<T extends Migration<null>> {
  /** The Migration class reference to instantiate. */
  migrationClass: new (...args: any[]) => T;
  /** The target path of the mock file. */
  filePath: string;
  /** The full initial contents of the file. */
  fileContent: string;
  /** Optional inline template string slice if testing a .ts component file. */
  inlineHtmlFragment?: string;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Universal runner that processes a template using any Angular CDK Migration class
 * and returns the transformed file content.
 */
export function runMigrationAndGetOutput<T extends Migration<null>>(
  options: RunMigrationOptions<T>,
): string {
  const { migrationClass, filePath, fileContent, inlineHtmlFragment } = options;
  const insertions: { offset: number; text: string }[] = [];
  const removals: { offset: number; length: number }[] = [];

  // Fully-typed mock for the CDK UpdateRecorder
  const mockRecorder = {
    insertLeft: vi.fn((offset: number, text: string) => {
      insertions.push({ offset, text });
      return mockRecorder;
    }),
    insertRight: vi.fn((offset: number, text: string) => {
      insertions.push({ offset, text });
      return mockRecorder;
    }),
    remove: vi.fn((offset: number, length: number) => {
      removals.push({ offset, length });
      return mockRecorder;
    }),
  };

  // Dynamic lookup types map directly to the fileSystem of the chosen migration class
  const mockFileSystem: Pick<T['fileSystem'], 'read' | 'edit' | 'resolve'> = {
    read: vi.fn((_: string) => fileContent),
    edit: vi.fn((_: string) => mockRecorder as unknown as ReturnType<T['fileSystem']['edit']>),
    resolve: vi.fn((path: string) => path as unknown as WorkspacePath),
  };

  // Dynamic lookup types map directly to the logger of the chosen migration class
  const mockLogger: Partial<T['logger']> = {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    fatal: vi.fn(),
    debug: vi.fn(),
  };

  // Instantiate the generic migration class dynamically
  const migration = new migrationClass();
  migration.fileSystem = mockFileSystem as unknown as T['fileSystem'];
  migration.logger = mockLogger as unknown as T['logger'];

  // Construct the template resource boundary parameters
  if (filePath.endsWith('.ts')) {
    // 1. Process TypeScript AST Nodes
    const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);

    const walkNode = (node: ts.Node) => {
      migration.visitNode(node);
      ts.forEachChild(node, walkNode);
    };

    walkNode(sourceFile);

    // 2. Process Inline HTML Templates if provided
    if (inlineHtmlFragment) {
      const startOffset = fileContent.indexOf(inlineHtmlFragment);
      if (startOffset !== -1) {
        const resource = {
          filePath: filePath as unknown as WorkspacePath,
          content: inlineHtmlFragment,
          start: startOffset,
        } as ResolvedResource;
        migration.visitTemplate(resource);
      }
    }
  } else {
    // 3. Process External HTML Files
    const resource = {
      filePath: filePath as unknown as WorkspacePath,
      content: fileContent,
      start: 0,
    } as ResolvedResource;
    migration.visitTemplate(resource);
  }

  // Apply changes to content (from back to front to ensure character indexes remain stable)
  let finalFileOutput = fileContent;

  removals.sort((a, b) => b.offset - a.offset);
  for (const removal of removals) {
    finalFileOutput =
      finalFileOutput.slice(0, removal.offset) +
      finalFileOutput.slice(removal.offset + removal.length);
  }

  insertions.sort((a, b) => b.offset - a.offset);
  for (const change of insertions) {
    finalFileOutput =
      finalFileOutput.slice(0, change.offset) + change.text + finalFileOutput.slice(change.offset);
  }

  return finalFileOutput;
}
