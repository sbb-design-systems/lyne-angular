import { describe, expect, it } from 'vitest';

import { RemoveTypesMigration } from '../removed-types.cjs';

import { runMigrationAndGetOutput } from './migration-runner.js';

describe(`sbb-removed-types`, () => {
  it('should insert a FIXME comment for CalendarView token references', () => {
    const sourceCode = `
      import { Component } from '@angular/core';

      export class MyComponent {
        view: CalendarView = 'day';
      }
    `;

    const result = runMigrationAndGetOutput({
      migrationClass: RemoveTypesMigration,
      filePath: 'src/app/my.component.ts',
      fileContent: sourceCode,
    });

    expect(result).toContain(
      `// FIXME: "CalendarView" has been replaced by "'day' | 'month' | 'year'". Check: https://github.com/sbb-design-systems/lyne-components/pull/4864`,
    );
  });

  it('should insert a FIXME comment for legacy CustomEvent token descriptors', () => {
    const sourceCode = `
      import { EventEmitter } from '@angular/core';

      export class AutocompleteComponent {
        autoEvent: CustomEvent<{ option: SbbOptionBaseElement<T> }>;
      }
    `;

    const result = runMigrationAndGetOutput({
      migrationClass: RemoveTypesMigration,
      filePath: 'src/app/autocomplete.component.ts',
      fileContent: sourceCode,
    });

    expect(result).toContain(
      `// FIXME: "CustomEvent<{ option: SbbOptionBaseElement<T> }>" has been replaced by "SbbInputAutocompleteEvent<T>". Check: https://github.com/sbb-design-systems/lyne-components/pull/4918`,
    );
  });

  it('should insert a FIXME comment for SbbButtonSize definitions across types', () => {
    const sourceCode = `
      import { Component } from '@angular/core';

      export class MyComponent {
        size = 'm' as SbbButtonSize;
      }
    `;

    const result = runMigrationAndGetOutput({
      migrationClass: RemoveTypesMigration,
      filePath: 'src/app/button.ts',
      fileContent: sourceCode,
    });

    expect(result).toContain(
      `// FIXME: "SbbButtonSize" has been replaced by "'s' | 'm' | 'l'". Check: https://github.com/sbb-design-systems/lyne-components/pull/4864`,
    );
  });
});
