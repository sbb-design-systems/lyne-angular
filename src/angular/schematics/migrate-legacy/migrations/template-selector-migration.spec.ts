import type { Rule } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import {
  createTemplateSelectorMigrationRule,
  type SelectorMigration,
} from './template-selector-migration.cjs';

describe('sbb-template-selector-migration', () => {
  const defaultMigrations: SelectorMigration[] = [
    { selector: 'button[sbb-button]', replaceWith: 'sbb-button' },
    { selector: 'sbb-usermenu', replaceWith: 'sbb-user-menu' },
  ];
  const defaultMigrationRule: Rule = createTemplateSelectorMigrationRule(defaultMigrations);

  describe('tag replacement', () => {
    it('should replace tag and remove marker attribute for tag + attribute selector', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<button sbb-button>Click me</button>',
          defaultMigrationRule,
        ),
      ).toBe('<sbb-button>Click me</sbb-button>');
    });

    it('should rename simple custom element tag names', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-usermenu>Menu</sbb-usermenu>',
          defaultMigrationRule,
        ),
      ).toBe('<sbb-user-menu>Menu</sbb-user-menu>');
    });

    it('should support attribute-only selectors', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<div sbb-legacy-card>Content</div>',
          createTemplateSelectorMigrationRule([
            { selector: '[sbb-legacy-card]', replaceWith: 'sbb-card' },
          ]),
        ),
      ).toBe('<sbb-card>Content</sbb-card>');
    });

    it('should preserve attributes and structural directives on the element', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<button sbb-button *ngIf="show" class="primary" [disabled]="isDisabled">Click</button>',
          defaultMigrationRule,
        ),
      ).toBe('<sbb-button *ngIf="show" class="primary" [disabled]="isDisabled">Click</sbb-button>');
    });

    it('should handle self-closing / void elements correctly', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<input sbb-input />',
          createTemplateSelectorMigrationRule([
            { selector: 'input[sbb-input]', replaceWith: 'sbb-input' },
          ]),
        ),
      ).toBe('<sbb-input />');
    });

    it('should migrate nested elements and multiple occurrences', async () => {
      const template = [
        '<sbb-usermenu>',
        '  <button sbb-button>Action 1</button>',
        '  <button sbb-button>Action 2</button>',
        '</sbb-usermenu>',
      ].join('\n');

      const expected = [
        '<sbb-user-menu>',
        '  <sbb-button>Action 1</sbb-button>',
        '  <sbb-button>Action 2</sbb-button>',
        '</sbb-user-menu>',
      ].join('\n');

      expect(await MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigrationRule)).toBe(
        expected,
      );
    });

    it('should migrate elements inside control flow blocks', async () => {
      const template = ['@if (visible) {', '  <button sbb-button>Label</button>', '}'].join('\n');
      const expected = ['@if (visible) {', '  <sbb-button>Label</sbb-button>', '}'].join('\n');
      expect(await MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigrationRule)).toBe(
        expected,
      );
    });

    it('should leave non-matching elements untouched', async () => {
      const template = '<button class="regular">Normal Button</button>';
      expect(await MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigrationRule)).toBe(
        template,
      );
    });

    it('should be idempotent', async () => {
      const once = await MigrateLegacyTestUtils.migrateHtmlFile(
        '<button sbb-button>Click me</button>',
        defaultMigrationRule,
      );
      expect(await MigrateLegacyTestUtils.migrateHtmlFile(once, defaultMigrationRule)).toBe(once);
    });
  });

  describe('edge cases', () => {
    it('should skip migration if element has no closing tag to prevent template corruption', async () => {
      // Unclosed tag <button sbb-button>
      const unclosedTemplate = '<button sbb-button>Unclosed';
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(unclosedTemplate, defaultMigrationRule),
      ).toBe(unclosedTemplate);
    });
  });

  describe('inline templates', () => {
    it('should migrate inline templates in component files', async () => {
      const content = await MigrateLegacyTestUtils.migrateTsFile(
        [
          "import { Component } from '@angular/core';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  template: `',
          '    <button sbb-button (click)="go()">Go</button>',
          '  `,',
          '})',
          'export class AppComponent {}',
        ].join('\n'),
        defaultMigrationRule,
      );

      expect(content).toContain('<sbb-button (click)="go()">Go</sbb-button>');
    });

    it('should not modify TypeScript files without matching selectors', async () => {
      const source = [
        "import { Component } from '@angular/core';",
        '',
        '@Component({',
        "  selector: 'app-root',",
        "  template: '<div>Unrelated</div>',",
        '})',
        'export class AppComponent {}',
      ].join('\n');

      const content = await MigrateLegacyTestUtils.migrateTsFile(source, defaultMigrationRule);
      expect(content).toBe(source);
    });
  });
});
