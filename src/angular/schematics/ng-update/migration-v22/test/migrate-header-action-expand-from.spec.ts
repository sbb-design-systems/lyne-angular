import { describe, expect, it } from 'vitest';

import { MigrateHeaderActionExpandFrom } from '../migrate-header-action-expand-from.cjs';

import { testMigration } from './migration-runner';

describe(`sbb-migrate-header-action-expand-from`, () => {
  describe('Rule 1: no expandFrom — inserts hideLabelBelow="large"', () => {
    it('adds hideLabelBelow="large" to sbb-header-button without expandFrom', () => {
      const input = `<sbb-header-button>Label</sbb-header-button>`;
      const output = testMigration(MigrateHeaderActionExpandFrom, 'html', input);
      expect(output).toBe(`<sbb-header-button hideLabelBelow="large">Label</sbb-header-button>`);
    });

    it('adds hideLabelBelow="large" to sbb-header-link without expandFrom', () => {
      const input = `<sbb-header-link>Label</sbb-header-link>`;
      const output = testMigration(MigrateHeaderActionExpandFrom, 'html', input);
      expect(output).toBe(`<sbb-header-link hideLabelBelow="large">Label</sbb-header-link>`);
    });

    it('preserves existing attributes when adding hideLabelBelow', () => {
      const input = `<sbb-header-button class="active" id="btn">Label</sbb-header-button>`;
      const output = testMigration(MigrateHeaderActionExpandFrom, 'html', input);
      expect(output).toBe(
        `<sbb-header-button hideLabelBelow="large" class="active" id="btn">Label</sbb-header-button>`,
      );
    });

    it('handles self-closing tag without expandFrom', () => {
      const input = `<sbb-header-button />`;
      const output = testMigration(MigrateHeaderActionExpandFrom, 'html', input);
      expect(output).toBe(`<sbb-header-button hideLabelBelow="large" />`);
    });
  });

  describe('Rule 2: bound expandFrom — adds FIXME comment', () => {
    it('adds FIXME comment for [expandFrom] binding on sbb-header-button', () => {
      const input = `<sbb-header-button [expandFrom]="myVal">Label</sbb-header-button>`;
      const output = testMigration(MigrateHeaderActionExpandFrom, 'html', input);
      expect(output).toContain('<!-- FIXME:');
      expect(output).toContain('must be migrated manually to `hideLabelBelow`');
    });

    it('adds FIXME comment for [expandFrom] binding on sbb-header-link', () => {
      const input = `<sbb-header-link [expandFrom]="myVal">Label</sbb-header-link>`;
      const output = testMigration(MigrateHeaderActionExpandFrom, 'html', input);
      expect(output).toContain('<!-- FIXME:');
      expect(output).toContain('must be migrated manually to `hideLabelBelow`');
    });

    it('adds FIXME comment for [attr.expandFrom] binding', () => {
      const input = `<sbb-header-button [attr.expandFrom]="myVal">Label</sbb-header-button>`;
      const output = testMigration(MigrateHeaderActionExpandFrom, 'html', input);
      expect(output).toContain('<!-- FIXME:');
    });

    it('places FIXME comment above the element', () => {
      const input = `<sbb-header-button [expandFrom]="myVal">Label</sbb-header-button>`;
      const output = testMigration(MigrateHeaderActionExpandFrom, 'html', input);
      const fixmeIndex = output.indexOf('<!-- FIXME:');
      const elementIndex = output.indexOf('<sbb-header-button');
      expect(fixmeIndex).toBeLessThan(elementIndex);
    });

    it('preserves indentation in FIXME comment', () => {
      const input = `  <sbb-header-button [expandFrom]="myVal">Label</sbb-header-button>`;
      const output = testMigration(MigrateHeaderActionExpandFrom, 'html', input);
      expect(output).toMatch(/^ {2}<!-- FIXME:/m);
    });

    it('leaves the bound expandFrom attribute untouched', () => {
      const input = `<sbb-header-button [expandFrom]="myVal">Label</sbb-header-button>`;
      const output = testMigration(MigrateHeaderActionExpandFrom, 'html', input);
      expect(output).toContain('[expandFrom]="myVal"');
    });
  });

  describe('Rule 3a: static expandFrom="zero" — removes attribute', () => {
    it('removes expandFrom="zero" from sbb-header-button', () => {
      const input = `<sbb-header-button expandFrom="zero">Label</sbb-header-button>`;
      const output = testMigration(MigrateHeaderActionExpandFrom, 'html', input);
      expect(output).toBe(`<sbb-header-button>Label</sbb-header-button>`);
    });

    it('removes expandFrom="zero" from sbb-header-link', () => {
      const input = `<sbb-header-link expandFrom="zero">Label</sbb-header-link>`;
      const output = testMigration(MigrateHeaderActionExpandFrom, 'html', input);
      expect(output).toBe(`<sbb-header-link>Label</sbb-header-link>`);
    });

    it('preserves other attributes when removing expandFrom="zero"', () => {
      const input = `<sbb-header-button class="active" expandFrom="zero" id="btn">Label</sbb-header-button>`;
      const output = testMigration(MigrateHeaderActionExpandFrom, 'html', input);
      expect(output).toBe(`<sbb-header-button class="active" id="btn">Label</sbb-header-button>`);
    });

    it('does not insert hideLabelBelow when expandFrom="zero"', () => {
      const input = `<sbb-header-button expandFrom="zero">Label</sbb-header-button>`;
      const output = testMigration(MigrateHeaderActionExpandFrom, 'html', input);
      expect(output).not.toContain('hideLabelBelow');
    });
  });

  describe('Rule 3b: static expandFrom with non-zero value — replaces with hideLabelBelow', () => {
    it('replaces expandFrom="small" with hideLabelBelow="small"', () => {
      const input = `<sbb-header-button expandFrom="small">Label</sbb-header-button>`;
      const output = testMigration(MigrateHeaderActionExpandFrom, 'html', input);
      expect(output).toBe(`<sbb-header-button hideLabelBelow="small">Label</sbb-header-button>`);
    });

    it('replaces expandFrom="medium" with hideLabelBelow="medium"', () => {
      const input = `<sbb-header-button expandFrom="medium">Label</sbb-header-button>`;
      const output = testMigration(MigrateHeaderActionExpandFrom, 'html', input);
      expect(output).toBe(`<sbb-header-button hideLabelBelow="medium">Label</sbb-header-button>`);
    });

    it('replaces expandFrom="large" with hideLabelBelow="large"', () => {
      const input = `<sbb-header-button expandFrom="large">Label</sbb-header-button>`;
      const output = testMigration(MigrateHeaderActionExpandFrom, 'html', input);
      expect(output).toBe(`<sbb-header-button hideLabelBelow="large">Label</sbb-header-button>`);
    });

    it('handles single-quoted expandFrom value', () => {
      const input = `<sbb-header-button expandFrom='medium'>Label</sbb-header-button>`;
      const output = testMigration(MigrateHeaderActionExpandFrom, 'html', input);
      expect(output).toBe(`<sbb-header-button hideLabelBelow="medium">Label</sbb-header-button>`);
    });

    it('preserves other attributes when replacing expandFrom', () => {
      const input = `<sbb-header-button class="active" expandFrom="medium" id="btn">Label</sbb-header-button>`;
      const output = testMigration(MigrateHeaderActionExpandFrom, 'html', input);
      expect(output).toBe(
        `<sbb-header-button class="active" hideLabelBelow="medium" id="btn">Label</sbb-header-button>`,
      );
    });

    it('handles self-closing tag', () => {
      const input = `<sbb-header-button expandFrom="medium" />`;
      const output = testMigration(MigrateHeaderActionExpandFrom, 'html', input);
      expect(output).toBe(`<sbb-header-button hideLabelBelow="medium" />`);
    });
  });

  describe('multiple elements', () => {
    it('migrates multiple elements in the same template', () => {
      const input = `
<sbb-header-button expandFrom="medium">Button</sbb-header-button>
<sbb-header-link expandFrom="zero">Link</sbb-header-link>
      `.trim();
      const output = testMigration(MigrateHeaderActionExpandFrom, 'html', input);
      expect(output).toBe(
        `
<sbb-header-button hideLabelBelow="medium">Button</sbb-header-button>
<sbb-header-link>Link</sbb-header-link>
      `.trim(),
      );
    });

    it('handles mixed rules across multiple elements', () => {
      const input = `
<sbb-header-button>No expandFrom</sbb-header-button>
<sbb-header-button expandFrom="zero">Zero</sbb-header-button>
<sbb-header-button expandFrom="small">Static</sbb-header-button>
<sbb-header-button [expandFrom]="dynamic">Bound</sbb-header-button>
      `.trim();
      const output = testMigration(MigrateHeaderActionExpandFrom, 'html', input);
      expect(output).toContain('hideLabelBelow="large"');
      expect(output).toContain('<sbb-header-button>Zero</sbb-header-button>');
      expect(output).toContain('hideLabelBelow="small"');
      expect(output).toContain('<!-- FIXME:');
      expect(output).toContain('[expandFrom]="dynamic"');
    });
  });

  describe('unaffected elements', () => {
    it('does not touch expandFrom on other elements', () => {
      const input = `<sbb-button expandFrom="medium">Label</sbb-button>`;
      const output = testMigration(MigrateHeaderActionExpandFrom, 'html', input);
      expect(output).toBe(input);
    });
  });

  describe('inline template in .ts file', () => {
    it('adds hideLabelBelow="large" when no expandFrom in inline template', () => {
      const input = `
@Component({
  template: \`<sbb-header-button>Label</sbb-header-button>\`,
})
export class TestComponent {}
      `.trim();
      const output = testMigration(MigrateHeaderActionExpandFrom, 'ts', input);
      expect(output).toContain('hideLabelBelow="large"');
    });

    it('replaces static expandFrom in inline template', () => {
      const input = `
@Component({
  template: \`<sbb-header-button expandFrom="medium">Label</sbb-header-button>\`,
})
export class TestComponent {}
      `.trim();
      const output = testMigration(MigrateHeaderActionExpandFrom, 'ts', input);
      expect(output).toContain('hideLabelBelow="medium"');
      expect(output).not.toContain('expandFrom=');
    });

    it('adds FIXME comment for bound expandFrom in inline template', () => {
      const input = `
@Component({
  template: \`<sbb-header-button [expandFrom]="myVal">Label</sbb-header-button>\`,
})
export class TestComponent {}
      `.trim();
      const output = testMigration(MigrateHeaderActionExpandFrom, 'ts', input);
      expect(output).toContain('// FIXME:');
      expect(output).toContain('[expandFrom]="myVal"');
    });
  });
});
