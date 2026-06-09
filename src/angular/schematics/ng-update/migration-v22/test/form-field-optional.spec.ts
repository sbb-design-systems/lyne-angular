import { describe, expect, it } from 'vitest';

import { FormFieldOptionalMigration } from '../form-field-optional.cjs';

import { runMigrationAndGetOutput } from './migration-runner';

describe(`sbb-form-field-optional`, () => {
  it('should add comment in HTML file', () => {
    const mockInput = `
<div class="container">
  <sbb-form-field optional>
    <input placeholder="First Name" />
  </sbb-form-field>
</div>
`.trim();

    const mockOutput = `
<div class="container">
  <!-- FIXME: The "optional" attribute on \`<sbb-form-field>\` is not allowed anymore. Check: https://lyne-angular.app.sbb.ch/angular/components/form-field/overview#visualization-of-coderequiredcode--optional-state and https://github.com/sbb-design-systems/lyne-components/pull/4931 -->
  <sbb-form-field optional>
    <input placeholder="First Name" />
  </sbb-form-field>
</div>
`.trim();

    const result = runMigrationAndGetOutput({
      migrationClass: FormFieldOptionalMigration,
      filePath: 'src/app/component.html',
      fileContent: mockInput,
    });

    expect(result).toBe(mockOutput);
  });

  it('should add comment in HTML file', () => {
    const mockInput = `
<div class="container">
  <sbb-form-field [attr.optional]="true">
    <input placeholder="First Name" />
  </sbb-form-field>
</div>
`.trim();

    const mockOutput = `
<div class="container">
  <!-- FIXME: The "optional" attribute on \`<sbb-form-field>\` is not allowed anymore. Check: https://lyne-angular.app.sbb.ch/angular/components/form-field/overview#visualization-of-coderequiredcode--optional-state and https://github.com/sbb-design-systems/lyne-components/pull/4931 -->
  <sbb-form-field [attr.optional]="true">
    <input placeholder="First Name" />
  </sbb-form-field>
</div>
`.trim();

    const result = runMigrationAndGetOutput({
      migrationClass: FormFieldOptionalMigration,
      filePath: 'src/app/component.html',
      fileContent: mockInput,
    });

    expect(result).toBe(mockOutput);
  });

  it('should add comment in TS file', () => {
    const mockInput = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<sbb-form-field optional><input /></sbb-form-field>'
})
export class AppComponent {}
`.trim();

    const mockOutput = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // FIXME: The "optional" attribute on \`<sbb-form-field>\` is not allowed anymore. Check: https://lyne-angular.app.sbb.ch/angular/components/form-field/overview#visualization-of-coderequiredcode--optional-state and https://github.com/sbb-design-systems/lyne-components/pull/4931
  template: '<sbb-form-field optional><input /></sbb-form-field>'
})
export class AppComponent {}
`.trim();

    const result = runMigrationAndGetOutput({
      migrationClass: FormFieldOptionalMigration,
      filePath: 'src/app/app.component.ts',
      fileContent: mockInput,
    });

    expect(result).toBe(mockOutput);
  });
});
