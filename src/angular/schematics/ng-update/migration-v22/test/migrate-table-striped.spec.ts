import { describe, expect, it } from 'vitest';

import { MigrateTableStriped } from '../migrate-table-striped.cjs'; // Adjust relative path as needed

import { runMigrationAndGetOutput } from './migration-runner';

describe(`sbb-migrate-table-striped`, () => {
  it('should add sbb-table--striped class to tables in an HTML file', () => {
    const mockInput = `
<div class="container">
  <table class="sbb-table">
    <thead>
      <tr><th>Header</th></tr>
    </thead>
  </table>
</div>
`.trim();

    const mockOutput = `
<div class="container">
  <table class="sbb-table sbb-table--striped">
    <thead>
      <tr><th>Header</th></tr>
    </thead>
  </table>
</div>
`.trim();

    const result = runMigrationAndGetOutput({
      migrationClass: MigrateTableStriped,
      filePath: 'src/app/component.html',
      fileContent: mockInput,
    });

    expect(result).toBe(mockOutput);
  });

  it('should not double-add the class if sbb-table--striped is already present (with spaces)', () => {
    const mockInput = `
<div class="container">
  <table class="sbb-table sbb-table--striped">
    <thead>
      <tr><th>Header</th></tr>
    </thead>
  </table>
</div>
`.trim();

    const result = runMigrationAndGetOutput({
      migrationClass: MigrateTableStriped,
      filePath: 'src/app/component.html',
      fileContent: mockInput,
    });

    // The content should remain completely untouched
    expect(result).toBe(mockInput);
  });

  it('should ignore other modifier classes that share the sbb-table prefix', () => {
    const mockInput = `
<div class="container">
  <table class="sbb-table-custom-modifier">
    <thead>
      <tr><th>Header</th></tr>
    </thead>
  </table>
</div>
`.trim();

    const result = runMigrationAndGetOutput({
      migrationClass: MigrateTableStriped,
      filePath: 'src/app/component.html',
      fileContent: mockInput,
    });

    // The negative lookahead (?!-) should prevent this from changing
    expect(result).toBe(mockInput);
  });

  it('should add the class to inline templates inside TS files', () => {
    const mockInput = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
    <div class="wrapper">
      <table class="sbb-table"></table>
    </div>
  \`,
})
export class AppComponent {}
`.trim();

    const mockOutput = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
    <div class="wrapper">
      <table class="sbb-table sbb-table--striped"></table>
    </div>
  \`,
})
export class AppComponent {}
`.trim();

    const result = runMigrationAndGetOutput({
      migrationClass: MigrateTableStriped,
      filePath: 'src/app/component.ts',
      fileContent: mockInput,
    });

    expect(result).toBe(mockOutput);
  });
});
