import { describe, expect, it } from 'vitest';

import { MigrateJourneyHeaderSize } from '../migrate-journey-header-size.cjs';

import { testMigration } from './migration-runner';

describe(`sbb-migrate-journey-header-size`, () => {
  describe('Rule 1: visualLevel already present — remove size unconditionally', () => {
    it('removes static size when visualLevel is present', () => {
      const input = `<sbb-journey-header size="m" visualLevel="5">Content</sbb-journey-header>`;
      const output = testMigration(MigrateJourneyHeaderSize, 'html', input);
      expect(output).toBe(`<sbb-journey-header visualLevel="5">Content</sbb-journey-header>`);
    });

    it('removes bound [size] when visualLevel is present', () => {
      const input = `<sbb-journey-header [size]="mySize" visualLevel="5">Content</sbb-journey-header>`;
      const output = testMigration(MigrateJourneyHeaderSize, 'html', input);
      expect(output).toBe(`<sbb-journey-header visualLevel="5">Content</sbb-journey-header>`);
    });

    it('removes [attr.size] when visualLevel is present', () => {
      const input = `<sbb-journey-header [attr.size]="mySize" visualLevel="4">Content</sbb-journey-header>`;
      const output = testMigration(MigrateJourneyHeaderSize, 'html', input);
      expect(output).toBe(`<sbb-journey-header visualLevel="4">Content</sbb-journey-header>`);
    });

    it('does not touch visualLevel itself', () => {
      const input = `<sbb-journey-header size="s" visualLevel="3">Content</sbb-journey-header>`;
      const output = testMigration(MigrateJourneyHeaderSize, 'html', input);
      expect(output).toContain('visualLevel="3"');
      expect(output).not.toContain('size=');
    });
  });

  describe('Rule 2: bound size without visualLevel — adds FIXME comment', () => {
    it('adds FIXME comment for [size] binding', () => {
      const input = `<sbb-journey-header [size]="mySize">Content</sbb-journey-header>`;
      const output = testMigration(MigrateJourneyHeaderSize, 'html', input);
      expect(output).toContain('<!-- FIXME:');
      expect(output).toContain('must be migrated manually to `visualLevel`');
    });

    it('adds FIXME comment for [attr.size] binding', () => {
      const input = `<sbb-journey-header [attr.size]="mySize">Content</sbb-journey-header>`;
      const output = testMigration(MigrateJourneyHeaderSize, 'html', input);
      expect(output).toContain('<!-- FIXME:');
      expect(output).toContain('must be migrated manually to `visualLevel`');
    });

    it('places FIXME comment above the element', () => {
      const input = `<sbb-journey-header [size]="mySize">Content</sbb-journey-header>`;
      const output = testMigration(MigrateJourneyHeaderSize, 'html', input);
      const fixmeIndex = output.indexOf('<!-- FIXME:');
      const elementIndex = output.indexOf('<sbb-journey-header');
      expect(fixmeIndex).toBeLessThan(elementIndex);
    });

    it('preserves indentation in FIXME comment', () => {
      const input = `  <sbb-journey-header [size]="mySize">Content</sbb-journey-header>`;
      const output = testMigration(MigrateJourneyHeaderSize, 'html', input);
      expect(output).toMatch(/^ {2}<!-- FIXME:/m);
    });

    it('leaves the bound size attribute untouched', () => {
      const input = `<sbb-journey-header [size]="mySize">Content</sbb-journey-header>`;
      const output = testMigration(MigrateJourneyHeaderSize, 'html', input);
      expect(output).toContain('[size]="mySize"');
    });
  });

  describe('Rule 3: static size without visualLevel — replaces with mapped visualLevel', () => {
    it('replaces size="s" with visualLevel="6"', () => {
      const input = `<sbb-journey-header size="s">Content</sbb-journey-header>`;
      const output = testMigration(MigrateJourneyHeaderSize, 'html', input);
      expect(output).toBe(`<sbb-journey-header visualLevel="6">Content</sbb-journey-header>`);
    });

    it('replaces size="m" with visualLevel="5"', () => {
      const input = `<sbb-journey-header size="m">Content</sbb-journey-header>`;
      const output = testMigration(MigrateJourneyHeaderSize, 'html', input);
      expect(output).toBe(`<sbb-journey-header visualLevel="5">Content</sbb-journey-header>`);
    });

    it('replaces size="l" with visualLevel="4"', () => {
      const input = `<sbb-journey-header size="l">Content</sbb-journey-header>`;
      const output = testMigration(MigrateJourneyHeaderSize, 'html', input);
      expect(output).toBe(`<sbb-journey-header visualLevel="4">Content</sbb-journey-header>`);
    });

    it('preserves other attributes when replacing size', () => {
      const input = `<sbb-journey-header class="my-class" size="m" id="header">Content</sbb-journey-header>`;
      const output = testMigration(MigrateJourneyHeaderSize, 'html', input);
      expect(output).toBe(
        `<sbb-journey-header class="my-class" visualLevel="5" id="header">Content</sbb-journey-header>`,
      );
    });

    it('handles single-quoted size value', () => {
      const input = `<sbb-journey-header size='m'>Content</sbb-journey-header>`;
      const output = testMigration(MigrateJourneyHeaderSize, 'html', input);
      expect(output).toBe(`<sbb-journey-header visualLevel="5">Content</sbb-journey-header>`);
    });

    it('handles self-closing tag', () => {
      const input = `<sbb-journey-header size="m" />`;
      const output = testMigration(MigrateJourneyHeaderSize, 'html', input);
      expect(output).toBe(`<sbb-journey-header visualLevel="5" />`);
    });
  });

  describe('multiple elements', () => {
    it('migrates multiple sbb-journey-header elements in the same template', () => {
      const input = `
<sbb-journey-header size="s">First</sbb-journey-header>
<sbb-journey-header size="l">Second</sbb-journey-header>
      `.trim();
      const output = testMigration(MigrateJourneyHeaderSize, 'html', input);
      expect(output).toBe(
        `
<sbb-journey-header visualLevel="6">First</sbb-journey-header>
<sbb-journey-header visualLevel="4">Second</sbb-journey-header>
      `.trim(),
      );
    });

    it('handles mixed rules across multiple elements', () => {
      const input = `
<sbb-journey-header size="m">Static</sbb-journey-header>
<sbb-journey-header [size]="dynamic">Bound</sbb-journey-header>
<sbb-journey-header size="s" visualLevel="3">Both</sbb-journey-header>
      `.trim();
      const output = testMigration(MigrateJourneyHeaderSize, 'html', input);
      expect(output).toContain('visualLevel="5"');
      expect(output).toContain('<!-- FIXME:');
      expect(output).toContain('[size]="dynamic"');
      expect(output).toContain('visualLevel="3"');
      expect(output).not.toMatch(/<sbb-journey-header[^>]*\bsize="/);
    });
  });

  describe('unaffected elements', () => {
    it('does not touch size on other elements', () => {
      const input = `<sbb-button size="m">Label</sbb-button>`;
      const output = testMigration(MigrateJourneyHeaderSize, 'html', input);
      expect(output).toBe(input);
    });

    it('does not touch sbb-journey-header without size', () => {
      const input = `<sbb-journey-header class="foo">Content</sbb-journey-header>`;
      const output = testMigration(MigrateJourneyHeaderSize, 'html', input);
      expect(output).toBe(input);
    });
  });

  describe('inline template in .ts file', () => {
    it('replaces static size in inline template', () => {
      const input = `
@Component({
  template: \`<sbb-journey-header size="m">Content</sbb-journey-header>\`,
})
export class TestComponent {}
      `.trim();
      const output = testMigration(MigrateJourneyHeaderSize, 'ts', input);
      expect(output).toContain('visualLevel="5"');
      expect(output).not.toContain('size=');
    });

    it('replaces static size in inline template (multiline)', () => {
      const input = `
@Component({
  template: \`
    <sbb-journey-header size="l">
      Content
    </sbb-journey-header>
  \`,
})
export class TestComponent {}
      `.trim();
      const output = testMigration(MigrateJourneyHeaderSize, 'ts', input);
      expect(output).toEqual(
        `
@Component({
  template: \`
    <sbb-journey-header visualLevel="4">
      Content
    </sbb-journey-header>
  \`,
})
export class TestComponent {}`.trim(),
      );
    });

    it('adds FIXME comment for bound size in inline template', () => {
      const input = `
@Component({
  template: \`<sbb-journey-header [size]="mySize">Content</sbb-journey-header>\`,
})
export class TestComponent {}
      `.trim();
      const output = testMigration(MigrateJourneyHeaderSize, 'ts', input);
      expect(output).toContain('// FIXME:');
      expect(output).toContain('[size]="mySize"');
    });
  });
});
