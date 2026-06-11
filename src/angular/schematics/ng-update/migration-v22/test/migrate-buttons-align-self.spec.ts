import { describe, expect, it } from 'vitest';

import { MigrateButtonAlignSelf } from '../migrate-buttons-align-self.cjs';

import { testMigration } from './migration-runner';

describe(`sbb-migrate-buttons-align-self`, () => {
  describe('remove attributes in HTML', () => {
    const tagsToVerify = [
      'sbb-accent-button',
      'sbb-accent-button-static',
      'sbb-button',
      'sbb-button-static',
      'sbb-secondary-button',
      'sbb-secondary-button-static',
      'sbb-transparent-button',
      'sbb-transparent-button-static',
      'sbb-accent-button-link',
      'sbb-button-link',
      'sbb-secondary-button-link',
      'sbb-transparent-button-link',
    ];

    tagsToVerify.forEach((tag) => {
      it(`successfully targets and clears alignSelf attribute from <${tag}>`, () => {
        const input = `<${tag} alignSelf="baseline">Label</${tag}>`;
        const output = testMigration(MigrateButtonAlignSelf, 'html', input);
        expect(output).toContain(`<${tag}>Label</${tag}>`);
        expect(output).toContain("FIXME: 'alignSelf' has been removed.");
      });

      it(`successfully targets and clears align-self attribute from <${tag}>`, () => {
        const input = `<${tag} align-self="stretch">Label</${tag}>`;
        const output = testMigration(MigrateButtonAlignSelf, 'html', input);
        expect(output).toContain(`<${tag}>Label</${tag}>`);
        expect(output).toContain("FIXME: 'align-self' has been removed.");
      });

      it(`successfully targets and clears [alignSelf] attribute from <${tag}>`, () => {
        const input = `<${tag} [alignSelf]="baseline">Label</${tag}>`;
        const output = testMigration(MigrateButtonAlignSelf, 'html', input);
        expect(output).toContain(`<${tag}>Label</${tag}>`);
        expect(output).toContain("FIXME: 'alignSelf' has been removed.");
      });

      it(`successfully targets and clears [align-self] attribute from <${tag}>`, () => {
        const input = `<${tag} [align-self]="stretch">Label</${tag}>`;
        const output = testMigration(MigrateButtonAlignSelf, 'html', input);
        expect(output).toContain(`<${tag}>Label</${tag}>`);
        expect(output).toContain("FIXME: 'align-self' has been removed.");
      });

      it(`successfully targets and clears [attr.align-self] attribute from <${tag}>`, () => {
        const input = `<${tag} [attr.align-self]="stretch">Label</${tag}>`;
        const output = testMigration(MigrateButtonAlignSelf, 'html', input);
        expect(output).toContain(`<${tag}>Label</${tag}>`);
        expect(output).toContain("FIXME: 'align-self' has been removed.");
      });

      it('preserves unrelated attributes when removing alignSelf', () => {
        const input = `<${tag} alignSelf="stretch" id="test">Label</${tag}>`;
        const output = testMigration(MigrateButtonAlignSelf, 'html', input);
        expect(output).toContain(`<${tag} id="test">Label</${tag}>`);
        expect(output).toContain("FIXME: 'alignSelf' has been removed.");
      });

      it('does not touch unrelated elements that happen to use alignSelf', () => {
        const input = `<div alignSelf="center">Standard flex item</div>`;
        const output = testMigration(MigrateButtonAlignSelf, 'html', input);
        expect(output).toBe(input);
      });
    });
  });

  describe('inline templates in .ts files', () => {
    it('removes alignSelf from inline template and formats comments as single-line JS comments', () => {
      const input = `
@Component({
  template: '<sbb-button alignSelf="center">Confirm</sbb-button>',
})
export class MyComponent {}
      `.trim();
      const output = testMigration(MigrateButtonAlignSelf, 'ts', input);
      expect(output).not.toContain('alignSelf="center"');
      expect(output).toContain('<sbb-button>Confirm</sbb-button>');
      expect(output).toContain(
        `// FIXME: 'alignSelf' has been removed. Check you style by referring to https://lyne-angular.app.sbb.ch/angular/guides/layout#flex .`,
      );
    });
  });
});
