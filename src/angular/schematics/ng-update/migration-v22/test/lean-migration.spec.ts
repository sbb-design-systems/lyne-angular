import { describe, expect, it } from 'vitest';

import { LeanClassMigration } from '../migrate-lean-theme.cjs';

import { testMigration } from './migration-runner';

describe(`sbb-lean-migration`, () => {
  it('should add comment in HTML file', () => {
    const mockInput =
      `<sbb-button class="sbb-lean sbb-dark" iconName="pie-small">test</sbb-button>`.trim();

    const mockOutput = `
<!-- FIXME: legacy \`sbb-lean\` class detected on this element. Adapt the element styling if necessary and/or check https://lyne-angular.app.sbb.ch/angular/guides/theming#themes. -->
<sbb-button class="sbb-lean sbb-dark" iconName="pie-small">test</sbb-button>
`.trim();

    const result = testMigration(LeanClassMigration, 'html', mockInput);
    expect(result).toBe(mockOutput);
  });

  it('should add comment in TS file', () => {
    const mockInput = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<sbb-button class="sbb-lean sbb-dark" iconName="pie-small">test</sbb-button>'
})
export class AppComponent {}
`.trim();

    const mockOutput = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // FIXME: legacy \`sbb-lean\` class detected on this element. Adapt the element styling if necessary and/or check https://lyne-angular.app.sbb.ch/angular/guides/theming#themes.
  template: '<sbb-button class="sbb-lean sbb-dark" iconName="pie-small">test</sbb-button>'
})
export class AppComponent {}
`.trim();

    const result = testMigration(LeanClassMigration, 'ts', mockInput);
    expect(result).toBe(mockOutput);
  });
});
