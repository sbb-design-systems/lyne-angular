import { describe, expect, it } from 'vitest';

import { TitleMarginBlockMigration } from '../title-margin-block.cjs';

import { testMigration } from './migration-runner';

describe(`sbb-title-margin-block`, () => {
  it('should add comment in HTML file', () => {
    const mockInput = `
:host {
  background: blue;
  --sbb-title-margin-block: 2rem;
  color: white;
}
`.trim();

    const mockOutput = `
:host {
  background: blue;
  /* FIXME: "--sbb-title-margin-block" has been removed. Check: https://github.com/sbb-design-systems/lyne-components/pull/4913  */
  --sbb-title-margin-block: 2rem;
  color: white;
}
`.trim();

    const result = testMigration(TitleMarginBlockMigration, 'scss', mockInput);
    expect(result).toBe(mockOutput);
  });

  it('should add comment in TS file', () => {
    const mockInput = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<sbb-form-field optional><input /></sbb-form-field>'
  styles: [\`
    :host {
      background: blue;
      --sbb-title-margin-block: 2rem;
      color: white;
    }
  \`]
})
export class AppComponent {}
`.trim();

    const mockOutput = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<sbb-form-field optional><input /></sbb-form-field>'
  // FIXME: "--sbb-title-margin-block" has been removed. Check: https://github.com/sbb-design-systems/lyne-components/pull/4913
  styles: [\`
    :host {
      background: blue;
      --sbb-title-margin-block: 2rem;
      color: white;
    }
  \`]
})
export class AppComponent {}
`.trim();

    const result = testMigration(TitleMarginBlockMigration, 'ts', mockInput);
    expect(result).toBe(mockOutput);
  });
});
