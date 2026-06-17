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
}
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Walks a TypeScript AST to find all `template: '...'` or `template: \`...\``
 * string literals inside @Component decorators, returning each as a
 * ResolvedResource suitable for visitTemplate.
 */
function extractInlineTemplates(filePath: string, fileContent: string): ResolvedResource[] {
  const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);
  const templates: ResolvedResource[] = [];

  const visit = (node: ts.Node) => {
    if (
      ts.isPropertyAssignment(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === 'template' &&
      (ts.isStringLiteral(node.initializer) || ts.isTemplateLiteral(node.initializer))
    ) {
      const literal = node.initializer;
      const contentStart = literal.getStart(sourceFile) + 1;
      const contentEnd = literal.getEnd() - 1;
      const content = fileContent.slice(contentStart, contentEnd);

      templates.push({
        filePath: filePath as unknown as WorkspacePath,
        content,
        start: contentStart,
        inline: true,
      } as ResolvedResource);
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return templates;
}

/**
 * Walks a TypeScript AST to find all `styles: ['...']` or `styles: [\`...\`]`
 * array entries inside @Component decorators, returning each as a
 * ResolvedResource suitable for visitStylesheet.
 */
function extractInlineStyles(filePath: string, fileContent: string): ResolvedResource[] {
  const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);
  const styles: ResolvedResource[] = [];

  const visit = (node: ts.Node) => {
    if (
      ts.isPropertyAssignment(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === 'styles' &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      for (const element of node.initializer.elements) {
        if (ts.isStringLiteral(element) || ts.isTemplateLiteral(element)) {
          const contentStart = element.getStart(sourceFile) + 1;
          const contentEnd = element.getEnd() - 1;
          const content = fileContent.slice(contentStart, contentEnd);

          styles.push({
            filePath: filePath as unknown as WorkspacePath,
            content,
            start: contentStart,
            inline: true,
          } as ResolvedResource);
        }
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return styles;
}

function runMigrationAndGetOutput<T extends Migration<null>>(
  options: RunMigrationOptions<T>,
): string {
  const { migrationClass, filePath, fileContent } = options;
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
    // Process TypeScript AST Nodes
    const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);

    const walkNode = (node: ts.Node) => {
      migration.visitNode(node);
      ts.forEachChild(node, walkNode);
    };

    walkNode(sourceFile);

    for (const template of extractInlineTemplates(filePath, fileContent)) {
      migration.visitTemplate(template);
    }

    for (const style of extractInlineStyles(filePath, fileContent)) {
      migration.visitStylesheet(style);
    }
  } else if (filePath.endsWith('.scss') || filePath.endsWith('.css')) {
    migration.visitStylesheet({
      filePath: filePath as unknown as WorkspacePath,
      content: fileContent,
      start: 0,
      inline: false,
    } as ResolvedResource);
  } else {
    migration.visitTemplate({
      filePath: filePath as unknown as WorkspacePath,
      content: fileContent,
      start: 0,
      inline: false,
    } as ResolvedResource);
  }

  // Apply changes to content (from back to front to ensure character indexes remain stable)
  type TextOp =
    | { type: 'remove'; offset: number; length: number }
    | { type: 'insert'; offset: number; text: string };

  // Sort from back to front (descending offset).
  // If the offsets match, ensure the 'remove' operation happens first.
  const operations: TextOp[] = [
    ...removals.map((r) => ({ type: 'remove' as const, ...r })),
    ...insertions.map((i) => ({ type: 'insert' as const, ...i })),
  ];

  operations.sort((a, b) => {
    if (b.offset !== a.offset) {
      return b.offset - a.offset;
    }
    return a.type === 'remove' ? -1 : 1;
  });

  let finalFileOutput = fileContent;

  for (const op of operations) {
    if (op.type === 'remove') {
      finalFileOutput =
        finalFileOutput.slice(0, op.offset) + finalFileOutput.slice(op.offset + op.length);
    } else {
      finalFileOutput =
        finalFileOutput.slice(0, op.offset) + op.text + finalFileOutput.slice(op.offset);
    }
  }

  return finalFileOutput;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function testMigration<T>(
  migrationClass: new (...args: any[]) => Migration<null, T>,
  fileExtension: 'html' | 'ts' | 'scss',
  fileContent: string,
): string {
  return runMigrationAndGetOutput({
    migrationClass,
    filePath: `test.${fileExtension}`,
    fileContent,
  });
}
/* eslint-enable @typescript-eslint/no-explicit-any */
