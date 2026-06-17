import { describe, expect, it } from 'vitest';

import { MigrateNavigationActionSize } from '../migrate-navigation-action-size.cjs';

import { testMigration } from './migration-runner';

describe(`sbb-migrate-navigation-action-size`, () => {
  describe('sbb-navigation-button', () => {
    it('removes plain size attribute', () => {
      const input = `<sbb-navigation-button size="m">Label</sbb-navigation-button>`;
      const output = testMigration(MigrateNavigationActionSize, 'html', input);
      expect(output).toBe(`<sbb-navigation-button>Label</sbb-navigation-button>`);
    });

    it('removes bound [size] attribute', () => {
      const input = `<sbb-navigation-button [size]="mySize">Label</sbb-navigation-button>`;
      const output = testMigration(MigrateNavigationActionSize, 'html', input);
      expect(output).toBe(`<sbb-navigation-button>Label</sbb-navigation-button>`);
    });

    it('removes [attr.size] attribute', () => {
      const input = `<sbb-navigation-button [attr.size]="mySize">Label</sbb-navigation-button>`;
      const output = testMigration(MigrateNavigationActionSize, 'html', input);
      expect(output).toBe(`<sbb-navigation-button>Label</sbb-navigation-button>`);
    });

    it('removes size attribute without value', () => {
      const input = `<sbb-navigation-button size>Label</sbb-navigation-button>`;
      const output = testMigration(MigrateNavigationActionSize, 'html', input);
      expect(output).toBe(`<sbb-navigation-button>Label</sbb-navigation-button>`);
    });

    it('preserves other attributes when removing size', () => {
      const input = `<sbb-navigation-button class="active" size="m" id="nav-btn">Label</sbb-navigation-button>`;
      const output = testMigration(MigrateNavigationActionSize, 'html', input);
      expect(output).toBe(
        `<sbb-navigation-button class="active" id="nav-btn">Label</sbb-navigation-button>`,
      );
    });

    it('handles self-closing tag', () => {
      const input = `<sbb-navigation-button size="m" />`;
      const output = testMigration(MigrateNavigationActionSize, 'html', input);
      expect(output).toBe(`<sbb-navigation-button />`);
    });
  });

  describe('sbb-navigation-link', () => {
    it('removes plain size attribute', () => {
      const input = `<sbb-navigation-link size="m">Label</sbb-navigation-link>`;
      const output = testMigration(MigrateNavigationActionSize, 'html', input);
      expect(output).toBe(`<sbb-navigation-link>Label</sbb-navigation-link>`);
    });

    it('removes bound [size] attribute', () => {
      const input = `<sbb-navigation-link [size]="mySize">Label</sbb-navigation-link>`;
      const output = testMigration(MigrateNavigationActionSize, 'html', input);
      expect(output).toBe(`<sbb-navigation-link>Label</sbb-navigation-link>`);
    });

    it('removes [attr.size] attribute', () => {
      const input = `<sbb-navigation-link [attr.size]="mySize">Label</sbb-navigation-link>`;
      const output = testMigration(MigrateNavigationActionSize, 'html', input);
      expect(output).toBe(`<sbb-navigation-link>Label</sbb-navigation-link>`);
    });

    it('preserves other attributes when removing size', () => {
      const input = `<sbb-navigation-link href="/home" size="m">Label</sbb-navigation-link>`;
      const output = testMigration(MigrateNavigationActionSize, 'html', input);
      expect(output).toBe(`<sbb-navigation-link href="/home">Label</sbb-navigation-link>`);
    });
  });

  describe('unaffected elements', () => {
    it('does not touch size on other elements', () => {
      const input = `<sbb-button size="m">Label</sbb-button>`;
      const output = testMigration(MigrateNavigationActionSize, 'html', input);
      expect(output).toBe(input);
    });

    it('does not touch unrelated attributes on navigation elements', () => {
      const input = `<sbb-navigation-button class="active" id="nav-btn">Label</sbb-navigation-button>`;
      const output = testMigration(MigrateNavigationActionSize, 'html', input);
      expect(output).toBe(input);
    });
  });

  describe('multiple elements', () => {
    it('removes size from multiple elements in the same template', () => {
      const input = `
<sbb-navigation-button size="m">Button</sbb-navigation-button>
<sbb-navigation-link size="m">Link</sbb-navigation-link>
      `.trim();
      const output = testMigration(MigrateNavigationActionSize, 'html', input);
      expect(output).toBe(
        `
<sbb-navigation-button>Button</sbb-navigation-button>
<sbb-navigation-link>Link</sbb-navigation-link>
      `.trim(),
      );
    });
  });

  describe('inline template in .ts file', () => {
    it('removes size from inline template', () => {
      const input = `
@Component({
  template: \`<sbb-navigation-button size="m">Label</sbb-navigation-button>\`,
})
export class TestComponent {}
      `.trim();
      const output = testMigration(MigrateNavigationActionSize, 'ts', input);
      expect(output).toContain('<sbb-navigation-button>Label</sbb-navigation-button>');
    });

    it('removes size from inline template with other attributes', () => {
      const input = `
@Component({
  template: \`<sbb-navigation-link href="/home" size="m">Label</sbb-navigation-link>\`,
})
export class TestComponent {}
      `.trim();
      const output = testMigration(MigrateNavigationActionSize, 'ts', input);
      expect(output).toContain('<sbb-navigation-link href="/home">Label</sbb-navigation-link>');
    });
  });
});
