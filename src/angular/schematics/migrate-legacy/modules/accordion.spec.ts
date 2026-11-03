import { chain, type Rule } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { ACCORDION_MIGRATIONS, wrapPanelContentMigration } from './accordion.cjs';

describe('sbb-accordion', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, attributes } = ACCORDION_MIGRATIONS;
    const scope = { root: '', excludedRoots: [] };
    return chain([
      createImportPathMigrationRule(importPaths, scope),
      createCommentMigrationRule(comments, scope),
      createAttributeMigrationRule(attributes, scope),
      wrapPanelContentMigration(scope),
    ]);
  };

  const migrateTsFile = (content: string) =>
    MigrateLegacyTestUtils.migrateTsFile(content, defaultMigration);
  const migrateTemplate = (template: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigration);

  describe('import paths', () => {
    it('should rewrite accordion imports', async () => {
      const content = await migrateTsFile(
        [
          "import { SbbAccordionModule } from '@sbb-esta/angular/accordion';",
          "export { SbbAccordionModule } from '@sbb-esta/angular/accordion';",
          "import { SbbIconModule } from '@sbb-esta/angular/icon';",
        ].join('\n'),
      );

      expect(content).toContain(
        "import { SbbAccordionModule } from '@sbb-esta/lyne-angular/accordion';",
      );
      expect(content).toContain(
        "export { SbbAccordionModule } from '@sbb-esta/lyne-angular/accordion';",
      );
      expect(content).toContain("from '@sbb-esta/angular/icon';");
    });
  });

  describe('hideToggle', () => {
    it.each(['sbb-accordion', 'sbb-expansion-panel'])(
      'should mark hideToggle on <%s>',
      async (tag) => {
        const content = await migrateTemplate(`<${tag} hideToggle></${tag}>`);

        expect(content).toContain("FIXME: 'hideToggle'");
      },
    );

    it('should mark a bound hideToggle', async () => {
      expect(
        await migrateTemplate('<sbb-accordion [hideToggle]="true"></sbb-accordion>'),
      ).toContain("FIXME: 'hideToggle'");
    });

    it('should not mark elements without hideToggle', async () => {
      const template = '<sbb-accordion></sbb-accordion>';
      expect(await migrateTemplate(template)).toBe(template);
    });
  });

  describe('events', () => {
    it('should rename afterExpand to open', async () => {
      expect(
        await migrateTemplate('<sbb-expansion-panel (afterExpand)="func"></sbb-expansion-panel>'),
      ).toBe('<sbb-expansion-panel (open)="func"></sbb-expansion-panel>');
    });

    it('should rename afterCollapse to close', async () => {
      expect(
        await migrateTemplate('<sbb-expansion-panel (afterCollapse)="func"></sbb-expansion-panel>'),
      ).toBe('<sbb-expansion-panel (close)="func"></sbb-expansion-panel>');
    });
  });

  describe('expansion panel content', () => {
    it('should wrap the content following the header', async () => {
      expect(
        await migrateTemplate(
          [
            '<sbb-expansion-panel>',
            '  <sbb-expansion-panel-header>Title</sbb-expansion-panel-header>',
            '  <p>content</p> text',
            '</sbb-expansion-panel>',
          ].join('\n'),
        ),
      ).toBe(
        [
          '<sbb-expansion-panel>',
          '  <sbb-expansion-panel-header>Title</sbb-expansion-panel-header>',
          '  <sbb-expansion-panel-content><p>content</p> text</sbb-expansion-panel-content>',
          '</sbb-expansion-panel>',
        ].join('\n'),
      );
    });

    it('should be idempotent and skip panels without content', async () => {
      const wrapped = [
        '<sbb-expansion-panel>',
        '  <sbb-expansion-panel-header>T</sbb-expansion-panel-header>',
        '  <sbb-expansion-panel-content>c</sbb-expansion-panel-content>',
        '</sbb-expansion-panel>',
      ].join('\n');
      const empty = [
        '<sbb-expansion-panel>',
        '  <sbb-expansion-panel-header>T</sbb-expansion-panel-header>',
        '</sbb-expansion-panel>',
      ].join('\n');

      expect(await migrateTemplate(wrapped)).toBe(wrapped);
      expect(await migrateTemplate(empty)).toBe(empty);
    });

    it('should wrap nested panels', async () => {
      const input = [
        '<sbb-expansion-panel>',
        '  <sbb-expansion-panel-header>A</sbb-expansion-panel-header>',
        '  <sbb-expansion-panel>',
        '    <sbb-expansion-panel-header>B</sbb-expansion-panel-header>',
        '    x',
        '  </sbb-expansion-panel>',
        '</sbb-expansion-panel>',
      ].join('\n');

      expect(await migrateTemplate(input)).toBe(
        [
          '<sbb-expansion-panel>',
          '  <sbb-expansion-panel-header>A</sbb-expansion-panel-header>',
          '  <sbb-expansion-panel-content><sbb-expansion-panel>',
          '    <sbb-expansion-panel-header>B</sbb-expansion-panel-header>',
          '    <sbb-expansion-panel-content>x</sbb-expansion-panel-content>',
          '  </sbb-expansion-panel></sbb-expansion-panel-content>',
          '</sbb-expansion-panel>',
        ].join('\n'),
      );
    });

    it('should wrap content in inline templates', async () => {
      const content = await migrateTsFile(
        [
          "import { Component } from '@angular/core';",
          '',
          '@Component({',
          '  template: `',
          '    <sbb-expansion-panel>',
          '      <sbb-expansion-panel-header>T</sbb-expansion-panel-header>',
          '      x',
          '    </sbb-expansion-panel>',
          '  `,',
          '})',
          'class A {}',
        ].join('\n'),
      );

      expect(content).toContain('<sbb-expansion-panel-content>x</sbb-expansion-panel-content>');
    });
  });
});
