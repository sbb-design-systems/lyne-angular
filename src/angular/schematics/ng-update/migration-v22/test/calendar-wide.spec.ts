import { describe, expect, it } from 'vitest';

import { CalendarWideMigration } from '../calendar-wide.cjs';

import { runMigrationAndGetOutput } from './migration-runner';

describe(`sbb-calendar-wide`, () => {
  it('should add comment in HTML file', () => {
    const mockInput = `
<div class="container">
  <sbb-calendar wide>
    <sbb-calendar-day value="2025-01-01"></sbb-calendar-day>
  </sbb-calendar>
</div>
`.trim();

    const mockOutput = `
<div class="container">
  <!-- FIXME: The "wide" attribute on \`<sbb-calendar>\` has been removed in favor of "amount". Check the release breaking changes for more info. -->
  <sbb-calendar wide>
    <sbb-calendar-day value="2025-01-01"></sbb-calendar-day>
  </sbb-calendar>
</div>
`.trim();

    const result = runMigrationAndGetOutput({
      migrationClass: CalendarWideMigration,
      filePath: 'src/app/component.html',
      fileContent: mockInput,
    });

    expect(result).toBe(mockOutput);
  });

  it('should add comment in TS file', () => {
    const mockInputTs = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
    <sbb-calendar wide>
      <sbb-calendar-day value="2025-01-01"></sbb-calendar-day>
    </sbb-calendar>
  \`
})
export class AppComponent {}
`.trim();

    const mockOutputTs = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // FIXME: The "wide" attribute on \`<sbb-calendar>\` has been removed in favor of "amount". Check the release breaking changes for more info.
  template: \`
    <sbb-calendar wide>
      <sbb-calendar-day value="2025-01-01"></sbb-calendar-day>
    </sbb-calendar>
  \`
})
export class AppComponent {}

`.trim();

    const result = runMigrationAndGetOutput({
      migrationClass: CalendarWideMigration,
      filePath: 'src/app/app.component.ts',
      fileContent: mockInputTs,
    });

    expect(result).toBe(mockOutputTs);
  });

  it('should add comment in TS file (bound)', () => {
    const mockInputTs = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
    <sbb-calendar [wide]>
      <sbb-calendar-day value="2025-01-01"></sbb-calendar-day>
    </sbb-calendar>
  \`
})
export class AppComponent {}
`.trim();

    const mockOutputTs = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // FIXME: The "wide" attribute on \`<sbb-calendar>\` has been removed in favor of "amount". Check the release breaking changes for more info.
  template: \`
    <sbb-calendar [wide]>
      <sbb-calendar-day value="2025-01-01"></sbb-calendar-day>
    </sbb-calendar>
  \`
})
export class AppComponent {}

`.trim();

    const result = runMigrationAndGetOutput({
      migrationClass: CalendarWideMigration,
      filePath: 'src/app/app.component.ts',
      fileContent: mockInputTs,
    });

    expect(result).toBe(mockOutputTs);
  });
});
