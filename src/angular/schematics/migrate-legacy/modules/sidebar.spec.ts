import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from '../migrations/template-selector-migration.cjs';
import { createTypeMigrationRule } from '../migrations/type-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { SIDEBAR_MIGRATIONS, iconSidebarItemMigration } from './sidebar.cjs';

describe('sbb-sidebar', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, types, attributes, selectors } = SIDEBAR_MIGRATIONS;
    return chain([
      createImportPathMigrationRule(importPaths),
      createCommentMigrationRule(comments),
      createTypeMigrationRule(types),
      createTemplateSelectorMigrationRule(selectors),
      createAttributeMigrationRule(attributes),
      iconSidebarItemMigration(),
    ]);
  };

  const migrateTsFile = (content: string) =>
    MigrateLegacyTestUtils.migrateTsFile(content, defaultMigration);
  const migrateTemplate = (template: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigration);

  it('should rewrite the import path', async () => {
    const content = await migrateTsFile(
      "import { SbbSidebarModule } from '@sbb-esta/angular/sidebar';",
    );
    expect(content).toContain("from '@sbb-esta/lyne-angular/sidebar';");
  });

  it('should migrate sidebar links', async () => {
    expect(await migrateTemplate('<a sbbSidebarLink href="">Link</a>')).toBe(
      '<sbb-block-link href="">Link</sbb-block-link>',
    );
  });

  it('should rename outputs', async () => {
    const template = await migrateTemplate(
      [
        '<sbb-sidebar',
        '  (opened)="a()"',
        '  (closed)="b()"',
        '  (openedStart)="c()"',
        '  (closedStart)="d()"',
        '></sbb-sidebar>',
      ].join('\n'),
    );
    expect(template).toBe(
      [
        '<sbb-sidebar',
        '  (open)="a()"',
        '  (close)="b()"',
        '  (beforeOpen)="c()"',
        '  (beforeClose)="d()"',
        '></sbb-sidebar>',
      ].join('\n'),
    );
  });

  it('should not rename the opened input nor outputs of other elements', async () => {
    const withInput = await migrateTemplate(
      '<sbb-sidebar [opened]="o" (opened)="a()"></sbb-sidebar>',
    );
    expect(withInput).toContain('[opened]="o" (open)="a()"');
    const other = '<sbb-foo (opened)="a()"></sbb-foo>';
    expect(await migrateTemplate(other)).toBe(other);
  });

  it('should not rename the output of a two-way binding', async () => {
    const template = await migrateTemplate('<sbb-sidebar [(opened)]="o"></sbb-sidebar>');
    expect(template).toContain('[(opened)]="o"');
  });

  describe('comments', () => {
    it.each(['collapsible', 'collapsibleTitle', 'triggerSvgIcon', '[opened]'])(
      'should comment %s',
      async (attribute) => {
        const template = await migrateTemplate(`<sbb-sidebar ${attribute}="x"></sbb-sidebar>`);
        expect(template).toMatch(/FIXME|WARNING/);
      },
    );

    it.each(['expanded', '[expanded]', '[(expanded)]', 'position', '[position]'])(
      'should comment %s on the icon sidebar',
      async (attribute) => {
        const template = await migrateTemplate(
          `<sbb-icon-sidebar ${attribute}="x"></sbb-icon-sidebar>`,
        );
        expect(template).toContain('FIXME');
      },
    );

    it('should not comment a plain icon sidebar', async () => {
      const template = '<sbb-icon-sidebar></sbb-icon-sidebar>';
      expect(await migrateTemplate(template)).toBe(template);
    });

    it('should not comment the opened output', async () => {
      expect(await migrateTemplate('<sbb-sidebar (opened)="a()"></sbb-sidebar>')).not.toMatch(
        /FIXME|WARNING/,
      );
    });

    it('should not comment a plain sidebar', async () => {
      const template = '<sbb-sidebar position="end"></sbb-sidebar>';
      expect(await migrateTemplate(template)).toBe(template);
    });
  });

  describe('icon sidebar item', () => {
    it('should migrate the item with a static label and the icon', async () => {
      expect(
        await migrateTemplate(
          '<a sbbIconSidebarItem label="Station" href=""><sbb-icon svgIcon="x"></sbb-icon></a>',
        ),
      ).toBe(
        '<sbb-icon-sidebar-link sbb-tooltip="Station" accessibilityLabel="Station" href=""><sbb-icon slot="icon" svgIcon="x"></sbb-icon></sbb-icon-sidebar-link>',
      );
    });

    it('should migrate a bound label', async () => {
      expect(await migrateTemplate('<a sbbIconSidebarItem [label]="l"></a>')).toBe(
        '<sbb-icon-sidebar-link [sbb-tooltip]="l" [accessibilityLabel]="l"></sbb-icon-sidebar-link>',
      );
    });

    it('should migrate an item without label', async () => {
      expect(await migrateTemplate('<a sbbIconSidebarItem href="#"></a>')).toBe(
        '<sbb-icon-sidebar-link href="#"></sbb-icon-sidebar-link>',
      );
    });

    it('should keep an existing slot', async () => {
      expect(
        await migrateTemplate('<a sbbIconSidebarItem><sbb-icon slot="other"></sbb-icon></a>'),
      ).toBe('<sbb-icon-sidebar-link><sbb-icon slot="other"></sbb-icon></sbb-icon-sidebar-link>');
    });

    it('should not touch other anchors', async () => {
      const template = '<a label="x"><sbb-icon></sbb-icon></a>';
      expect(await migrateTemplate(template)).toBe(template);
    });
  });
});
