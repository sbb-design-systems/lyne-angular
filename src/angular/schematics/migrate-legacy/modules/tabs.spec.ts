import { chain, type Rule } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from '../migrations/template-selector-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { TABS_MIGRATIONS, tabLabelMigration } from './tabs.cjs';

describe('sbb-tabs', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, selectors, attributes } = TABS_MIGRATIONS;
    return chain([
      createImportPathMigrationRule(importPaths),
      createCommentMigrationRule(comments),
      createTemplateSelectorMigrationRule(selectors),
      createAttributeMigrationRule(attributes),
      tabLabelMigration(),
    ]);
  };

  const migrateTsFile = (content: string) =>
    MigrateLegacyTestUtils.migrateTsFile(content, defaultMigration);
  const migrateTemplate = (template: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigration);

  describe('import paths', () => {
    it('should rewrite tabs imports', async () => {
      const content = await migrateTsFile(
        [
          "import { SbbTabsModule } from '@sbb-esta/angular/tabs';",
          "import { SbbIconModule } from '@sbb-esta/angular/icon';",
        ].join('\n'),
      );

      expect(content).toContain("import { SbbTabsModule } from '@sbb-esta/lyne-angular/tabs';");
      expect(content).toContain("from '@sbb-esta/angular/icon';");
    });

    it('should mark SbbTabChangeEvent', async () => {
      const content = await migrateTsFile(
        [
          "import { SbbTabChangeEvent } from '@sbb-esta/angular/tabs';",
          'export const x: SbbTabChangeEvent | undefined = undefined;',
        ].join('\n'),
      );

      expect(content).toContain('FIXME: the event changed');
    });
  });

  describe('sbb-tab-group', () => {
    it('should rename selectedIndex and selectedTabChange', async () => {
      const content = await migrateTemplate(
        '<sbb-tab-group [selectedIndex]="i" (selectedTabChange)="f($event)"></sbb-tab-group>',
      );

      expect(content).toContain('[initialSelectedIndex]="i"');
      expect(content).toContain('(tabChange)="f($event)"');
    });

    it('should mark two-way binding of selectedIndex', async () => {
      const content = await migrateTemplate(
        '<sbb-tab-group [(selectedIndex)]="i"></sbb-tab-group>',
      );

      expect(content).toContain("FIXME: 'selectedIndex' is now 'initialSelectedIndex'");
    });

    it('should mark selectedTabChange', async () => {
      expect(
        await migrateTemplate('<sbb-tab-group (selectedTabChange)="f($event)"></sbb-tab-group>'),
      ).toContain("FIXME: 'selectedTabChange' is now 'tabChange'");
    });

    it.each(['animationDuration', 'disablePagination', 'preserveContent'])(
      'should mark %s',
      async (name) => {
        expect(await migrateTemplate(`<sbb-tab-group ${name}="x"></sbb-tab-group>`)).toContain(
          `FIXME: '${name}'`,
        );
      },
    );

    it('should add fixedHeight when dynamicHeight is not set', async () => {
      expect(await migrateTemplate('<sbb-tab-group></sbb-tab-group>')).toBe(
        '<sbb-tab-group fixedHeight></sbb-tab-group>',
      );
    });

    it('should remove dynamicHeight', async () => {
      expect(await migrateTemplate('<sbb-tab-group dynamicHeight></sbb-tab-group>')).toBe(
        '<sbb-tab-group></sbb-tab-group>',
      );
    });

    it.each(['focusChange', 'animationDone'])('should mark (%s)', async (name) => {
      expect(await migrateTemplate(`<sbb-tab-group (${name})="f()"></sbb-tab-group>`)).toContain(
        `FIXME: '${name}'`,
      );
    });
  });

  describe('sbb-tab', () => {
    it.each(['labelClass', 'bodyClass'])('should mark %s', async (name) => {
      expect(await migrateTemplate(`<sbb-tab ${name}="x"></sbb-tab>`)).toContain(
        `FIXME: '${name}'`,
      );
    });

    it('should convert label templates', async () => {
      expect(
        await migrateTemplate('<sbb-tab><ng-template sbb-tab-label>x</ng-template></sbb-tab>'),
      ).toBe('<sbb-tab><sbb-tab-label>x</sbb-tab-label></sbb-tab>');
    });

    it('should rename the sbb-tab-label attribute to an element', async () => {
      expect(await migrateTemplate('<div sbb-tab-label>x</div>')).toBe(
        '<sbb-tab-label>x</sbb-tab-label>',
      );
    });

    it('should create a label from a static label', async () => {
      expect(await migrateTemplate('<sbb-tab label="First">Content</sbb-tab>')).toBe(
        '<sbb-tab-label>First</sbb-tab-label>\n<sbb-tab>Content</sbb-tab>',
      );
    });

    it('should create a label from a bound label', async () => {
      expect(await migrateTemplate('<sbb-tab [label]="title" class="a">Content</sbb-tab>')).toBe(
        '<sbb-tab-label>{{ title }}</sbb-tab-label>\n<sbb-tab class="a">Content</sbb-tab>',
      );
    });

    it('should move disabled to the label', async () => {
      expect(await migrateTemplate('<sbb-tab label="A" disabled>x</sbb-tab>')).toBe(
        '<sbb-tab-label disabled>A</sbb-tab-label>\n<sbb-tab>x</sbb-tab>',
      );
    });

    it('should move a bound disabled to the label', async () => {
      expect(await migrateTemplate('<sbb-tab label="A" [disabled]="d">x</sbb-tab>')).toBe(
        '<sbb-tab-label [disabled]="d">A</sbb-tab-label>\n<sbb-tab>x</sbb-tab>',
      );
    });

    it('should not touch a tab without label', async () => {
      const template = '<sbb-tab>x</sbb-tab>';
      expect(await migrateTemplate(template)).toBe(template);
    });
  });
});
