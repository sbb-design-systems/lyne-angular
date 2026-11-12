import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from '../migrations/template-selector-migration.cjs';
import { createTypeMigrationRule } from '../migrations/type-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { TAG_MIGRATIONS } from './tag.cjs';

describe('sbb-tag', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, types, attributes, selectors } = TAG_MIGRATIONS;
    return chain([
      createImportPathMigrationRule(importPaths),
      createCommentMigrationRule(comments),
      createTypeMigrationRule(types),
      createTemplateSelectorMigrationRule(selectors),
      createAttributeMigrationRule(attributes),
    ]);
  };

  const migrateTsFile = (content: string) =>
    MigrateLegacyTestUtils.migrateTsFile(content, defaultMigration);
  const migrateTemplate = (template: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigration);

  describe('imports and types', () => {
    it('should rewrite the import path and rename SbbTags', async () => {
      const result = await migrateTsFile(
        [
          `import { SbbTags } from '@sbb-esta/angular/tag';`,
          'export class A { tags!: SbbTags; }',
        ].join('\n'),
      );
      expect(result).toContain(`from '@sbb-esta/lyne-angular/tag'`);
      expect(result).toContain('tags!: SbbTagGroup');
    });
  });

  describe('sbb-tags', () => {
    it('should become a multiple sbb-tag-group with a FIXME', async () => {
      const result = await migrateTemplate('<sbb-tags><sbb-tag value="a">A</sbb-tag></sbb-tags>');
      expect(result).toContain('FIXME: the "All" tag is not automatically added anymore');
      expect(result).toContain('<sbb-tag-group multiple>');
      expect(result).toContain('</sbb-tag-group>');
      expect(result).not.toContain('<sbb-tags');
    });

    it('should keep existing attributes', async () => {
      expect(await migrateTemplate('<sbb-tags [totalAmount]="n"></sbb-tags>')).toContain(
        '<sbb-tag-group multiple [totalAmount]="n"></sbb-tag-group>',
      );
    });
  });

  describe('sbb-tag', () => {
    it('should rename svgIcon', async () => {
      expect(await migrateTemplate('<sbb-tag [svgIcon]="icon"></sbb-tag>')).toBe(
        '<sbb-tag [iconName]="icon"></sbb-tag>',
      );
    });

    it.each(['sbbBadgeDescription="d"', 'labelPosition="before"'])(
      'should flag %s',
      async (attribute) => {
        expect(await migrateTemplate(`<sbb-tag ${attribute}>A</sbb-tag>`)).toContain('FIXME');
      },
    );
  });

  describe('a[sbb-tag-link]', () => {
    it('should be flagged', async () => {
      expect(await migrateTemplate('<a sbb-tag-link amount="5">A</a>')).toContain(
        'FIXME: `sbb-tag-link` has no counterpart in Lyne.',
      );
    });
  });
});
