import { describe, expect, it } from 'vitest';

import { MigrateImportPaths } from '../migrate-import-paths.cjs';

import { testMigration } from './migration-runner';

describe(`sbb-migrate-import-paths`, () => {
  it('should update sub-entry point imports to their consolidated path using single quotes', () => {
    const mockInput = `
import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button/button';
import { SbbAccentButtonModule } from '@sbb-esta/lyne-angular/button/accent-button';
import { SbbCheckboxElement } from '@sbb-esta/lyne-elements/checkbox/checkbox';
import { SbbCheckboxElement } from '@sbb-esta/lyne-elements/checkbox/checkbox.js';
import '@sbb-esta/lyne-elements/checkbox/checkbox';
import '@sbb-esta/lyne-elements/checkbox/checkbox.js';

@Component({
  selector: 'app-root',
  template: '<button sbb-button></button>',
})
export class AppComponent {}
`.trim();

    const mockOutput = `
import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbAccentButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCheckboxElement } from '@sbb-esta/lyne-elements/checkbox';
import { SbbCheckboxElement } from '@sbb-esta/lyne-elements/checkbox.js';
import '@sbb-esta/lyne-elements/checkbox';
import '@sbb-esta/lyne-elements/checkbox.js';

@Component({
  selector: 'app-root',
  template: '<button sbb-button></button>',
})
export class AppComponent {}
`.trim();

    const result = testMigration(MigrateImportPaths, 'ts', mockInput);
    expect(result).toBe(mockOutput);
  });

  it('should preserve double quotes when migrating an import path', () => {
    const mockInput = `
import { SbbCheckboxModule } from "@sbb-esta/lyne-angular/checkbox/checkbox";
`.trim();

    const mockOutput = `
import { SbbCheckboxModule } from "@sbb-esta/lyne-angular/checkbox";
`.trim();

    const result = testMigration(MigrateImportPaths, 'ts', mockInput);
    expect(result).toBe(mockOutput);
  });

  it('should update export declarations from deprecated entry points', () => {
    const mockInput = `
export * from '@sbb-esta/lyne-angular/paginator/compact-paginator';
export { SbbPaginatorModule } from '@sbb-esta/lyne-angular/paginator/paginator';
`.trim();

    const mockOutput = `
export * from '@sbb-esta/lyne-angular/paginator';
export { SbbPaginatorModule } from '@sbb-esta/lyne-angular/paginator';
`.trim();

    const result = testMigration(MigrateImportPaths, 'ts', mockInput);
    expect(result).toBe(mockOutput);
  });

  it('should completely ignore unrelated third-party or internal relative imports', () => {
    const mockInput = `
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyService } from './my-service.service';
import { SbbRadioModule } from '@sbb-esta/lyne-angular/radio-button';
`.trim();

    const result = testMigration(MigrateImportPaths, 'ts', mockInput);
    expect(result).toBe(mockInput);
  });
});
