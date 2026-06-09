import { describe, expect, it } from 'vitest';

import { MigrateImportPaths } from '../migrate-import-paths.cjs';

import { runMigrationAndGetOutput } from './migration-runner';

describe(`sbb-migrate-import-paths`, () => {
  it('should update sub-entry point imports to their consolidated path using single quotes', () => {
    const mockInputTs = `
import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button/button';
import { SbbAccentButtonModule } from '@sbb-esta/lyne-angular/button/accent-button';

@Component({
  selector: 'app-root',
  template: '<button sbb-button></button>',
})
export class AppComponent {}
`.trim();

    const mockOutputTs = `
import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbAccentButtonModule } from '@sbb-esta/lyne-angular/button';

@Component({
  selector: 'app-root',
  template: '<button sbb-button></button>',
})
export class AppComponent {}
`.trim();

    const result = runMigrationAndGetOutput({
      migrationClass: MigrateImportPaths,
      filePath: 'src/app/app.component.ts',
      fileContent: mockInputTs,
    });

    expect(result).toBe(mockOutputTs);
  });

  it('should preserve double quotes when migrating an import path', () => {
    const mockInputTs = `
import { SbbCheckboxModule } from "@sbb-esta/lyne-angular/checkbox/checkbox";
`.trim();

    const mockOutputTs = `
import { SbbCheckboxModule } from "@sbb-esta/lyne-angular/checkbox";
`.trim();

    const result = runMigrationAndGetOutput({
      migrationClass: MigrateImportPaths,
      filePath: 'src/app/app.component.ts',
      fileContent: mockInputTs,
    });

    expect(result).toBe(mockOutputTs);
  });

  it('should update export declarations from deprecated entry points', () => {
    const mockInputTs = `
export * from '@sbb-esta/lyne-angular/paginator/compact-paginator';
export { SbbPaginatorModule } from '@sbb-esta/lyne-angular/paginator/paginator';
`.trim();

    const mockOutputTs = `
export * from '@sbb-esta/lyne-angular/paginator';
export { SbbPaginatorModule } from '@sbb-esta/lyne-angular/paginator';
`.trim();

    const result = runMigrationAndGetOutput({
      migrationClass: MigrateImportPaths,
      filePath: 'src/app/public-api.ts',
      fileContent: mockInputTs,
    });

    expect(result).toBe(mockOutputTs);
  });

  it('should completely ignore unrelated third-party or internal relative imports', () => {
    const mockInputTs = `
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyService } from './my-service.service';
import { SbbRadioModule } from '@sbb-esta/lyne-angular/radio-button';
`.trim();

    const result = runMigrationAndGetOutput({
      migrationClass: MigrateImportPaths,
      filePath: 'src/app/my-service.service.ts',
      fileContent: mockInputTs,
    });

    expect(result).toBe(mockInputTs);
  });
});
