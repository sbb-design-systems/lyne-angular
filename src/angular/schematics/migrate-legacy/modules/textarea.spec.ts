import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { HostTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { firstValueFrom } from 'rxjs';
import { describe, expect, it } from 'vitest';

import { migrateTextarea } from './textarea.cjs';

describe('sbb-textarea', () => {
  const tempCollectionPath = path.join(
    os.tmpdir(),
    'lyne-angular-migrate-textarea-collection.json',
  );
  fs.writeFileSync(tempCollectionPath, JSON.stringify({ schematics: {} }));
  const runner = new SchematicTestRunner('test', tempCollectionPath);

  describe('migration', () => {
    it('should only migrate the files of the given scope', async () => {
      const template = '<sbb-textarea></sbb-textarea>';
      const source = "import { SbbTextareaModule } from '@sbb-esta/angular/textarea';";
      const tree = new UnitTestTree(new HostTree());
      for (const project of ['app-a', 'app-b']) {
        tree.create(`/projects/${project}/src/app.component.html`, template);
        tree.create(`/projects/${project}/src/app.component.ts`, source);
      }

      await firstValueFrom(
        runner.callRule(migrateTextarea({ root: 'projects/app-a', excludedRoots: [] }), tree),
      );

      expect(tree.readText('/projects/app-a/src/app.component.html')).toContain(
        'FIXME: this component has no direct counterpart in lyne-angular; use sbb-form-field with a textarea.',
      );
      expect(tree.readText('/projects/app-a/src/app.component.ts')).toContain(
        '// FIXME: this component has no direct counterpart in lyne-angular; use sbb-form-field with a textarea.',
      );
      expect(tree.readText('/projects/app-b/src/app.component.html')).toBe(template);
      expect(tree.readText('/projects/app-b/src/app.component.ts')).toBe(source);
    });
  });
});
