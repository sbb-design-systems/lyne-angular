import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import type { ModuleMigrations } from '../common.cjs';
import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from '../migrations/template-selector-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import {
  DATEPICKER_MIGRATIONS,
  DEPRECATED_CALENDAR_ATTRIBUTES,
  DEPRECATED_CALENDAR_COMPONENTS,
  DEPRECATED_DATEPICKER_ATTRIBUTES,
  DEPRECATED_DATEPICKER_TYPES,
} from './datepicker.cjs';

describe('sbb-datepicker', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, selectors, attributes, customRules } =
      DATEPICKER_MIGRATIONS as Required<
        Pick<
          ModuleMigrations,
          'importPaths' | 'comments' | 'selectors' | 'attributes' | 'customRules'
        >
      >;
    return chain([
      createImportPathMigrationRule(importPaths),
      createCommentMigrationRule(comments),
      createTemplateSelectorMigrationRule(selectors),
      createAttributeMigrationRule(attributes),
      ...customRules.map((rule) => rule()),
    ]);
  };

  const migrateTsFile = (content: string) =>
    MigrateLegacyTestUtils.migrateTsFile(content, defaultMigration);
  const migrateTemplate = (template: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigration);

  describe('sbb-date-input', () => {
    it('imports', async () => {
      const content = await MigrateLegacyTestUtils.migrateTsFile(
        "import { SbbDateInput } from '@sbb-esta/angular/datepicker';",
        defaultMigration,
      );
      expect(content).toBe("import { SbbDateInput } from '@sbb-esta/lyne-angular/datepicker';");
    });

    it('comments', async () => {
      const migrated = await migrateTemplate(
        '<input sbbInput sbbDateInput (inputBlurred)="doSomething()"/>',
      );
      expect(migrated).toContain(
        'FIXME: `inputBlurred` does not exist anymore on `sbb-date-input`.',
      );
    });

    it('selector', async () => {
      const migrated = await migrateTemplate('<input sbbInput sbbDateInput value="2026.01.01"/>');
      expect(migrated).toBe('<sbb-date-input value="2026.01.01"></sbb-date-input>');
    });

    it('attributes', async () => {
      const migrated = await migrateTemplate(
        '<input sbbInput sbbDateInput (dateChange)="doSomething()" (dateInput)="doSomethingElse()"/>',
      );
      expect(migrated).toBe(
        '<sbb-date-input (change)="doSomething()" (input)="doSomethingElse()"></sbb-date-input>',
      );
    });

    it('full migration in controller', async () => {
      const content = await migrateTsFile(
        [
          "import { Component } from '@angular/core';",
          "import { SbbDatepickerModule } from '@sbb-esta/angular/datepicker';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  imports: [SbbDatepickerModule],',
          '  template: \'<input sbbInput sbbDateInput value="2026.01.01" (dateChange)="doSomething()" (dateInput)="doSomethingElse()"/>\'',
          '})',
          'export class AppComponent {}',
        ].join('\n'),
      );
      expect(content).toContain(
        '  template: \'<sbb-date-input value="2026.01.01" (change)="doSomething()" (input)="doSomethingElse()"></sbb-date-input>\'',
      );
    });
  });

  describe('datepicker', () => {
    it('full custom rule', async () => {
      const migrated = await migrateTemplate(
        [
          '<sbb-datepicker arrows toggle (closed)="closedEvent()" (opened)="openedEvent()">',
          '  <input',
          '    type="text"',
          '    sbbDateInput',
          '    sbbInput',
          '    [formControl]="date"',
          '    [min]="minDate.value"',
          '    [max]="maxDate.value"',
          '    [readonly]="readonly.value"',
          '    (dateChange)="dateChangeEvent($event)"',
          '    (dateInput)="dateInputEvent($event)"',
          '  />',
          '</sbb-datepicker>',
        ].join('\n'),
      );
      const result = [
        '<sbb-datepicker-previous-day></sbb-datepicker-previous-day>',
        '<sbb-datepicker-next-day></sbb-datepicker-next-day>',
        '<sbb-datepicker-toggle></sbb-datepicker-toggle>',
        '<sbb-date-input',
        '  type="text"',
        '  [formControl]="date"',
        '  [min]="minDate.value"',
        '  [max]="maxDate.value"',
        '  [readonly]="readonly.value"',
        '  (change)="dateChangeEvent($event)"',
        '  (input)="dateInputEvent($event)"',
        '></sbb-date-input>',
        '<sbb-datepicker (close)="closedEvent()" (open)="openedEvent()"></sbb-datepicker>',
      ].join('\n');
      expect(migrated).toBe(result);
    });

    it('no toggle no arrows', async () => {
      const migrated = await migrateTemplate(
        [
          '<sbb-datepicker (closed)="closedEvent()" (opened)="openedEvent()">',
          '  <input',
          '    type="text"',
          '    sbbDateInput',
          '    sbbInput',
          '    [formControl]="date"',
          '    [min]="minDate.value"',
          '    [max]="maxDate.value"',
          '    [readonly]="readonly.value"',
          '    (dateChange)="dateChangeEvent($event)"',
          '    (dateInput)="dateInputEvent($event)"',
          '  />',
          '</sbb-datepicker>',
        ].join('\n'),
      );
      const result = [
        '<sbb-date-input',
        '  type="text"',
        '  [formControl]="date"',
        '  [min]="minDate.value"',
        '  [max]="maxDate.value"',
        '  [readonly]="readonly.value"',
        '  (change)="dateChangeEvent($event)"',
        '  (input)="dateInputEvent($event)"',
        '></sbb-date-input>',
        '<sbb-datepicker (close)="closedEvent()" (open)="openedEvent()"></sbb-datepicker>',
      ].join('\n');
      expect(migrated).toBe(result);
    });

    it.each(DEPRECATED_DATEPICKER_ATTRIBUTES)('should add comment for %s', async (attribute) => {
      const content = await migrateTemplate(
        `<sbb-datepicker [${attribute}]="test"></sbb-datepicker>`,
      );
      expect(content).toContain(
        `<!-- FIXME: the attribute \`${attribute}\` does not exist anymore on \`sbb-datepicker\`. -->`,
      );
    });

    it.each(DEPRECATED_DATEPICKER_TYPES)('should add comment for %s', async (type) => {
      const content = await migrateTsFile(
        [
          "import { Component } from '@angular/core';",
          `import { SbbDatepickerModule, ${type} } from '@sbb-esta/angular/datepicker';`,
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  imports: [SbbDatepickerModule],',
          '  templateUrl: "./app.html"',
          '})',
          'export class AppComponent {',
          `  myVariable: ${type} | null = null;`,
          '}',
        ].join('\n'),
      );
      expect(content).toContain(`  // FIXME: the \`${type}\` type does not exist in Lyne.`);
    });
  });

  describe('calendar', () => {
    it.each(DEPRECATED_CALENDAR_ATTRIBUTES)('should add comment for %s', async (attribute) => {
      const content = await migrateTemplate(`<sbb-calendar [${attribute}]="test"></sbb-calendar>`);
      expect(content).toContain(
        `<!-- FIXME: the attribute \`${attribute}\` does not exist anymore on \`sbb-calendar\`. -->`,
      );
    });

    it.each(DEPRECATED_CALENDAR_COMPONENTS)('should add comment for %s', async (attribute) => {
      const content = await migrateTemplate(
        `<sbb-calendar><sbb-calendar-header></sbb-calendar-header><sbb-calendar-body></sbb-calendar-body></sbb-calendar>`,
      );
      expect(content).toContain(
        `<!-- FIXME: the \`${attribute}\` component does not exist in Lyne. -->`,
      );
    });
  });
});
