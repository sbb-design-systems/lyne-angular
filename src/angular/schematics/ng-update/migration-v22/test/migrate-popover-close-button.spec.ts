import { describe, expect, it } from 'vitest';

import { MigratePopoverCloseButton } from '../migrate-popover-close-button.cjs';

import { testMigration } from './migration-runner';

describe(`sbb-migrate-popover-close-button`, () => {
  describe('Case 1: static hideCloseButton attribute', () => {
    it('removes bare hideCloseButton attribute', () => {
      const input = `<sbb-popover hideCloseButton>Content</sbb-popover>`;
      const output = testMigration(MigratePopoverCloseButton, 'html', input);
      expect(output).toBe(`<sbb-popover>Content</sbb-popover>`);
    });

    it('removes hideCloseButton="true"', () => {
      const input = `<sbb-popover hideCloseButton="true">Content</sbb-popover>`;
      const output = testMigration(MigratePopoverCloseButton, 'html', input);
      expect(output).toBe(`<sbb-popover>Content</sbb-popover>`);
    });

    it('removes kebab-case hide-close-button attribute', () => {
      const input = `<sbb-popover hide-close-button>Content</sbb-popover>`;
      const output = testMigration(MigratePopoverCloseButton, 'html', input);
      expect(output).toBe(`<sbb-popover>Content</sbb-popover>`);
    });

    it('preserves other attributes when removing hideCloseButton', () => {
      const input = `<sbb-popover trigger="btn" hideCloseButton>Content</sbb-popover>`;
      const output = testMigration(MigratePopoverCloseButton, 'html', input);
      expect(output).toBe(`<sbb-popover trigger="btn">Content</sbb-popover>`);
    });
  });

  describe('Case 2: bound [hideCloseButton]="true"', () => {
    it('removes [hideCloseButton]="true" binding', () => {
      const input = `<sbb-popover [hideCloseButton]="true">Content</sbb-popover>`;
      const output = testMigration(MigratePopoverCloseButton, 'html', input);
      expect(output).toBe(`<sbb-popover>Content</sbb-popover>`);
    });

    it('preserves other attributes when removing [hideCloseButton]="true"', () => {
      const input = `<sbb-popover trigger="btn" [hideCloseButton]="true">Content</sbb-popover>`;
      const output = testMigration(MigratePopoverCloseButton, 'html', input);
      expect(output).toBe(`<sbb-popover trigger="btn">Content</sbb-popover>`);
    });
  });

  describe('Case 3: dynamic [hideCloseButton] expression', () => {
    it('adds FIXME comment for dynamic binding', () => {
      const input = `<sbb-popover [hideCloseButton]="isHidden">Content</sbb-popover>`;
      const output = testMigration(MigratePopoverCloseButton, 'html', input);
      expect(output).toContain(`<!-- FIXME:`);
      expect(output).toContain(`'[hideCloseButton]' on <sbb-popover> has been removed`);
      expect(output).toContain(`<sbb-popover [hideCloseButton]="isHidden">Content</sbb-popover>`);
    });

    it('adds FIXME comment above the element', () => {
      const input = `<sbb-popover [hideCloseButton]="isHidden">Content</sbb-popover>`;
      const output = testMigration(MigratePopoverCloseButton, 'html', input);
      const fixmeIndex = output.indexOf('<!-- FIXME:');
      const elementIndex = output.indexOf('<sbb-popover');
      expect(fixmeIndex).toBeLessThan(elementIndex);
    });

    it('preserves indentation in FIXME comment', () => {
      const input = `  <sbb-popover [hideCloseButton]="isHidden">Content</sbb-popover>`;
      const output = testMigration(MigratePopoverCloseButton, 'html', input);
      expect(output).toMatch(/^ {2}<!-- FIXME:/m);
    });
  });

  describe('Case 4: no hideCloseButton — inserts sbb-popover-close-button', () => {
    it('inserts sbb-popover-close-button as first child (multiline)', () => {
      const input = `<sbb-popover>\n  Content\n</sbb-popover>`;
      const output = testMigration(MigratePopoverCloseButton, 'html', input);
      expect(output).toContain('<sbb-popover-close-button></sbb-popover-close-button>');
      const closeButtonIndex = output.indexOf('<sbb-popover-close-button>');
      const contentIndex = output.indexOf('Content');
      expect(closeButtonIndex).toBeLessThan(contentIndex);
    });

    it('inserts sbb-popover-close-button inline when tag has no newline after it', () => {
      const input = `<sbb-popover>Content</sbb-popover>`;
      const output = testMigration(MigratePopoverCloseButton, 'html', input);
      expect(output).toBe(
        `<sbb-popover><sbb-popover-close-button></sbb-popover-close-button>Content</sbb-popover>`,
      );
    });

    it('respects indentation of the parent element', () => {
      const input = `  <sbb-popover>\n    Content\n  </sbb-popover>`;
      const output = testMigration(MigratePopoverCloseButton, 'html', input);
      expect(output).toContain('\n    <sbb-popover-close-button>');
    });

    it('is idempotent — does not insert a second sbb-popover-close-button', () => {
      const input = `<sbb-popover>\n  <sbb-popover-close-button></sbb-popover-close-button>\n  Content\n</sbb-popover>`;
      const output = testMigration(MigratePopoverCloseButton, 'html', input);
      const count = (output.match(/<sbb-popover-close-button>/g) ?? []).length;
      expect(count).toBe(1);
    });

    it('stops inserting sbb-popover-close-button because hoverTrigger present', () => {
      const input = `<sbb-popover hoverTrigger>\n  Content\n</sbb-popover>`;
      const output = testMigration(MigratePopoverCloseButton, 'html', input);
      expect(output).not.toContain('<sbb-popover-close-button></sbb-popover-close-button>');
    });

    it('stops inserting sbb-popover-close-button because hover-trigger present', () => {
      const input = `<sbb-popover hover-trigger>\n  Content\n</sbb-popover>`;
      const output = testMigration(MigratePopoverCloseButton, 'html', input);
      expect(output).not.toContain('<sbb-popover-close-button></sbb-popover-close-button>');
    });

    it('stops inserting sbb-popover-close-button because [hoverTrigger]="true" present', () => {
      const input = `<sbb-popover [hoverTrigger]="true">\n  Content\n</sbb-popover>`;
      const output = testMigration(MigratePopoverCloseButton, 'html', input);
      expect(output).not.toContain('<sbb-popover-close-button></sbb-popover-close-button>');
    });

    it('creates comment because [hoverTrigger] value not determinable', () => {
      const input = `<sbb-popover [hoverTrigger]="foo">\n  Content\n</sbb-popover>`;
      const output = testMigration(MigratePopoverCloseButton, 'html', input);
      expect(output).not.toContain('<sbb-popover-close-button></sbb-popover-close-button>');
      expect(output).toContain(
        `Conditionally rendered '[hoverTrigger]' on <sbb-popover> has been detected. If evaluated to true, do nothing, if false,conditionally render <sbb-popover-close-button>`,
      );
    });
  });

  describe('accessibilityCloseLabel transfer', () => {
    it('transfers static accessibility-close-label to aria-label on sbb-popover-close-button', () => {
      const input = `<sbb-popover accessibility-close-label="Close">\n  Content\n</sbb-popover>`;
      const output = testMigration(MigratePopoverCloseButton, 'html', input);
      expect(output).toContain(`<sbb-popover-close-button aria-label="Close">`);
      expect(output).not.toContain('accessibility-close-label');
    });

    it('transfers static accessibilityCloseLabel to aria-label on sbb-popover-close-button', () => {
      const input = `<sbb-popover accessibilityCloseLabel="Close">\n  Content\n</sbb-popover>`;
      const output = testMigration(MigratePopoverCloseButton, 'html', input);
      expect(output).toContain(`<sbb-popover-close-button aria-label="Close">`);
      expect(output).not.toContain('accessibilityCloseLabel');
    });

    it('transfers bound [accessibilityCloseLabel] to [aria-label] on sbb-popover-close-button', () => {
      const input = `<sbb-popover [accessibilityCloseLabel]="closeLabel">\n  Content\n</sbb-popover>`;
      const output = testMigration(MigratePopoverCloseButton, 'html', input);
      expect(output).toContain(`<sbb-popover-close-button [aria-label]="closeLabel">`);
      expect(output).not.toContain('accessibilityCloseLabel');
    });

    it('inserts sbb-popover-close-button without aria-label when no a11y label present', () => {
      const input = `<sbb-popover>\n  Content\n</sbb-popover>`;
      const output = testMigration(MigratePopoverCloseButton, 'html', input);
      expect(output).toContain('<sbb-popover-close-button></sbb-popover-close-button>');
      expect(output).not.toContain('aria-label');
    });
  });

  describe('unaffected elements', () => {
    it('does not touch other elements', () => {
      const input = `<sbb-dialog hideCloseButton>Content</sbb-dialog>`;
      const output = testMigration(MigratePopoverCloseButton, 'html', input);
      expect(output).toBe(input);
    });
  });

  describe('inline template in .ts file', () => {
    it('removes hideCloseButton from inline template', () => {
      const input = `
@Component({
  template: \`<sbb-popover hideCloseButton>Content</sbb-popover>\`,
})
export class TestComponent {}
      `.trim();
      const output = testMigration(MigratePopoverCloseButton, 'ts', input);
      expect(output).toContain('<sbb-popover>Content</sbb-popover>');
    });

    it('inserts sbb-popover-close-button in inline template', () => {
      const input = `
@Component({
  template: \`<sbb-popover>Content</sbb-popover>\`,
})
export class TestComponent {}
      `.trim();
      const output = testMigration(MigratePopoverCloseButton, 'ts', input);
      expect(output).toContain(
        '<sbb-popover><sbb-popover-close-button></sbb-popover-close-button>Content</sbb-popover>',
      );
    });
  });

  it('inserts sbb-popover-close-button in inline template (multiline)', () => {
    const input = `
@Component({
  template: \`
    <sbb-popover>
      Content
    </sbb-popover>
  \`,
})
export class TestComponent {}
      `.trim();
    const output = testMigration(MigratePopoverCloseButton, 'ts', input);
    expect(output).toEqual(
      `
@Component({
  template: \`
    <sbb-popover>
      <sbb-popover-close-button></sbb-popover-close-button>
      Content
    </sbb-popover>
  \`,
})
export class TestComponent {}`.trim(),
    );
  });
});
