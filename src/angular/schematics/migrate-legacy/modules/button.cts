import { Rule, Tree } from '@angular-devkit/schematics';

import { rewriteImportPaths } from '../../utils.cjs';

const OLD_BUTTON_IMPORT = '@sbb-esta/angular/button';
const NEW_BUTTON_IMPORT = '@sbb-esta/lyne-angular/button';

/**
 * Migrate button module from @sbb-esta/angular to @sbb-esta/lyne-angular.
 *
 * Transformations:
 * 1. ✓ Rewrite import paths
 * 2. TODO: Rename component classes (SbbButton* → SbbButton*)
 * 3. TODO: Update template selectors (sbb-* → sbb-*)
 * 4. TODO: Update input/output binding names
 * 5. TODO: Update CSS class names
 * 6. TODO: Add migration comments for manual review items
 */
export function migrateButton(): Rule {
  return (tree: Tree) => {
    tree.visit((filePath) => {
      if (!filePath.endsWith('.ts') || filePath.endsWith('.d.ts')) {
        return;
      }

      const buffer = tree.read(filePath);
      if (!buffer) {
        return;
      }

      const original = buffer.toString('utf-8');
      const updated = rewriteImportPaths(filePath, original, {
        oldImport: OLD_BUTTON_IMPORT,
        newImport: NEW_BUTTON_IMPORT,
      });

      if (updated !== original) {
        tree.overwrite(filePath, updated);
      }
    });
  };
}
