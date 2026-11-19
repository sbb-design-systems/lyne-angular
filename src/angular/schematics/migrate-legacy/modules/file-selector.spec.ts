import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { FILE_SELECTOR_MIGRATIONS } from './file-selector.cjs';

describe('sbb-file-selector', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, attributes } = FILE_SELECTOR_MIGRATIONS;
    return chain([
      createImportPathMigrationRule(importPaths),
      createCommentMigrationRule(comments),
      createAttributeMigrationRule(attributes),
    ]);
  };

  const migrateTsFile = (content: string) =>
    MigrateLegacyTestUtils.migrateTsFile(content, defaultMigration);
  const migrate = (content: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(content, defaultMigration);

  describe('should migrate', () => {
    it('imports', async () => {
      const content = await migrateTsFile(
        "import { SbbFileSelectorModule } from '@sbb-esta/angular/file-selector';",
      );
      expect(content).toBe(
        "import { SbbFileSelectorModule } from '@sbb-esta/lyne-angular/file-selector';",
      );
    });

    it('comments', async () => {
      const migrated = await migrateTsFile(
        [
          "import { Component } from '@angular/core';",
          "import { FileTypeCategory, SbbFileSelectorTypesService, SbbFileSelectorOptions } from '@sbb-esta/angular/file-selector';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  template: \'<sbb-file-selector [accept]="accept" capture="user"></sbb-file-selector>\',',
          '})',
          'export class AppComponent {',
          "  private _cat: FileTypeCategory = 'generic';",
          '  private _fileTypeService = inject(SbbFileSelectorTypesService);',
          '  private _opt: SbbFileSelectorOptions | null = null',
          '',
          '  constructor() {',
          '    this.accept = this._fileTypeService.getAcceptString(this._cat);',
          '  }',
          '}',
        ].join('\n'),
      );
      expect(migrated).toBe(
        [
          "import { Component } from '@angular/core';",
          '// FIXME: the `FileTypeCategory` type does not exist anymore in Lyne.',
          '// FIXME: the `SbbFileSelectorTypesService` does not exist anymore in Lyne.',
          '// FIXME: the `SbbFileSelectorOptions` interface does not exist anymore in Lyne.',
          "import { FileTypeCategory, SbbFileSelectorTypesService, SbbFileSelectorOptions } from '@sbb-esta/lyne-angular/file-selector';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  // FIXME: the `capture` attribute on `sbb-file-selector` does not exist anymore.',
          '  template: \'<sbb-file-selector [accept]="accept" capture="user"></sbb-file-selector>\',',
          '})',
          'export class AppComponent {',
          '  // FIXME: the `FileTypeCategory` type does not exist anymore in Lyne.',
          "  private _cat: FileTypeCategory = 'generic';",
          '  // FIXME: the `SbbFileSelectorTypesService` does not exist anymore in Lyne.',
          '  private _fileTypeService = inject(SbbFileSelectorTypesService);',
          '  // FIXME: the `SbbFileSelectorOptions` interface does not exist anymore in Lyne.',
          '  private _opt: SbbFileSelectorOptions | null = null',
          '',
          '  constructor() {',
          '    this.accept = this._fileTypeService.getAcceptString(this._cat);',
          '  }',
          '}',
        ].join('\n'),
      );
    });

    it('attribute', async () => {
      expect(await migrate('<sbb-file-selector [filesList]="files"></sbb-file-selector>')).toBe(
        '<sbb-file-selector [files]="files"></sbb-file-selector>',
      );
    });
  });
});
