import type { Dirent } from 'node:fs';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

import type { TSESTree } from '@typescript-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';

/**
 * Extracts all static `id="…"` / `id='…'` values from raw HTML.
 * Returns a Map of { id → [charIndex, …] } for every occurrence in the text.
 * Dynamic bindings like `[id]="expr"` are intentionally ignored.
 */
function extractIdsFromHtml(html: string): Map<string, number[]> {
  const result = new Map<string, number[]>();
  // Match  id="value"  or  id='value'  (case-insensitive attribute name)
  const re = /\bid\s*=\s*(?:"([^"]*?)"|'([^']*?)')/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const id = (m[1] ?? m[2]).trim();
    if (!id) {
      continue;
    }
    const positions = result.get(id) ?? [];
    positions.push(m.index);
    result.set(id, positions);
  }
  return result;
}

/**
 * Converts a character index in `text` to an ESLint Position
 * (1-based line, 0-based column).
 */
function indexToPosition(text: string, index: number): TSESTree.Position {
  const before = text.slice(0, index);
  const lines = before.split('\n');
  return { line: lines.length, column: lines[lines.length - 1].length };
}

/**
 * Returns the module examples folder (e.g. `.../examples/table`) from a path like
 * `.../examples/table/table-simple/table-simple-example.html`.
 */
function getModuleDir(filename: string): string | null {
  const normalized = filename.replace(/\\/g, '/');
  const m = normalized.match(/^(.*\/examples\/[^/]+)\//);
  return m ? m[1] : null;
}

/**
 * Reads all `*-example.html` files in every sub-directory of `moduleDir`,
 * skipping `currentFile`, and returns { id → ['subdir/filename.html', …] }.
 */
function collectSiblingIds(currentFile: string, moduleDir: string): Map<string, string[]> {
  const result = new Map<string, string[]>();
  let entries: Dirent[];
  try {
    entries = readdirSync(moduleDir, { withFileTypes: true });
  } catch {
    return result;
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    const subdir = path.join(moduleDir, entry.name);
    let files: string[];
    try {
      files = readdirSync(subdir)
        .filter((f) => f.endsWith('-example.html'))
        .map((f) => path.join(subdir, f));
    } catch {
      continue;
    }

    for (const file of files) {
      if (path.normalize(file) === path.normalize(currentFile)) {
        continue;
      }
      let content: string;
      try {
        content = readFileSync(file, 'utf-8');
      } catch {
        continue;
      }
      const relName = `${entry.name}/${path.basename(file)}`;
      for (const id of extractIdsFromHtml(content).keys()) {
        const list = result.get(id) ?? [];
        list.push(relName);
        result.set(id, list);
      }
    }
  }
  return result;
}

export default ESLintUtils.RuleCreator.withoutDocs({
  defaultOptions: [],
  meta: {
    type: 'problem',
    schema: [],
    fixable: undefined,
    hasSuggestions: false,
    docs: {
      description:
        'Ensures HTML id attributes are unique across all example templates of the same module, ' +
        'since all examples of a module are rendered on a single page.',
    },
    messages: {
      duplicateId:
        'The id "{{id}}" is already used in {{files}}. ' +
        'IDs must be unique across all examples of a module because they are rendered on one page.',
    },
  },

  create(context) {
    return {
      // Use Program:exit so the full source text is available.
      'Program:exit'(_programNode: TSESTree.Program) {
        const filename = context.filename.replace(/\\/g, '/');

        // Only apply to *-example.html files inside an examples directory.
        if (!filename.includes('/examples/') || !filename.endsWith('-example.html')) {
          return;
        }

        const moduleDir = getModuleDir(filename);
        if (!moduleDir) {
          return;
        }

        const sourceText = context.sourceCode.getText();
        const currentIds = extractIdsFromHtml(sourceText);
        if (currentIds.size === 0) {
          return;
        }

        const siblingIds = collectSiblingIds(filename, moduleDir);

        for (const [id, positions] of currentIds) {
          const conflictFiles = siblingIds.get(id);
          if (!conflictFiles) {
            continue;
          }
          for (const charIndex of positions) {
            const start = indexToPosition(sourceText, charIndex);
            // Cover the full  id="value"  token in the error highlight.
            const tokenEnd = charIndex + sourceText.slice(charIndex).indexOf(id) + id.length + 1;
            const end = indexToPosition(sourceText, tokenEnd);
            context.report({
              loc: { start, end },
              messageId: 'duplicateId',
              data: { id, files: conflictFiles.join(', ') },
            });
          }
        }
      },
    };
  },
});
