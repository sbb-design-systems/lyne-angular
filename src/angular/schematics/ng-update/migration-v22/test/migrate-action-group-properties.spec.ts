import { describe, expect, it } from 'vitest';

import { MigrateActionGroupProperties } from '../migrate-action-group-properties.cjs';

import { testMigration } from './migration-runner';

describe(`sbb-migrate-action-group-properties`, () => {
  describe('orientation / alignGroup / horizontalFrom removal', () => {
    it('removes static orientation attribute from sbb-action-group', () => {
      const input = `<sbb-action-group orientation="horizontal"></sbb-action-group>`;
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toContain(
        `<!-- FIXME: orientation has been removed. Check you style by referring to https://lyne-angular.app.sbb.ch/angular/guides/layout#flex . -->`,
      );
      expect(output).toContain(`<sbb-action-group></sbb-action-group>`);
    });

    it('removes bound [orientation] attribute', () => {
      const input = `<sbb-action-group [orientation]="myOrientation"></sbb-action-group>`;
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toContain(
        `<!-- FIXME: orientation has been removed. Check you style by referring to https://lyne-angular.app.sbb.ch/angular/guides/layout#flex . -->`,
      );
      expect(output).toContain(`<sbb-action-group></sbb-action-group>`);
    });

    it('removes static alignGroup attribute', () => {
      const input = `<sbb-action-group alignGroup="center"></sbb-action-group>`;
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toBe(`<sbb-action-group></sbb-action-group>`);
    });

    it('removes bound [alignGroup] attribute', () => {
      const input = `<sbb-action-group [alignGroup]="myAlign"></sbb-action-group>`;
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toBe(`<sbb-action-group></sbb-action-group>`);
    });

    it('removes static horizontalFrom attribute', () => {
      const input = `<sbb-action-group horizontalFrom="medium"></sbb-action-group>`;
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toContain(
        `<!-- FIXME: horizontalFrom has been removed. Check you style by referring to https://lyne-angular.app.sbb.ch/angular/guides/layout#flex . -->`,
      );
      expect(output).toContain(`<sbb-action-group></sbb-action-group>`);
    });

    it('removes bound [horizontalFrom] attribute', () => {
      const input = `<sbb-action-group [horizontalFrom]="myBreakpoint"></sbb-action-group>`;
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toContain(
        `<!-- FIXME: horizontalFrom has been removed. Check you style by referring to https://lyne-angular.app.sbb.ch/angular/guides/layout#flex . -->`,
      );
      expect(output).toContain(`<sbb-action-group></sbb-action-group>`);
    });

    it('removes multiple layout attributes at once', () => {
      const input = `<sbb-action-group orientation="horizontal" alignGroup="center" horizontalFrom="medium"></sbb-action-group>`;
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toContain(
        `<!-- FIXME: orientation and horizontalFrom have been removed. Check you style by referring to https://lyne-angular.app.sbb.ch/angular/guides/layout#flex . -->`,
      );
      expect(output).toContain(`<sbb-action-group></sbb-action-group>`);
    });

    it('removes layout attributes from sbb-dialog-actions', () => {
      const input = `<sbb-dialog-actions orientation="horizontal"></sbb-dialog-actions>`;
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toContain(
        `<!-- FIXME: orientation has been removed. Check you style by referring to https://lyne-angular.app.sbb.ch/angular/guides/layout#flex . -->`,
      );
      expect(output).toContain(`<sbb-dialog-actions></sbb-dialog-actions>`);
    });

    it('preserves unrelated attributes when removing layout attributes', () => {
      const input = `<sbb-action-group class="my-group" orientation="horizontal" id="actions"></sbb-action-group>`;
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toContain(
        `<!-- FIXME: orientation has been removed. Check you style by referring to https://lyne-angular.app.sbb.ch/angular/guides/layout#flex . -->`,
      );
      expect(output).toContain(
        `<sbb-action-group class="my-group" id="actions"></sbb-action-group>`,
      );
    });
  });

  describe('align-group / horizontal-from removal', () => {
    it('removes static align-group attribute', () => {
      const input = `<sbb-action-group align-group="center"></sbb-action-group>`;
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toBe(`<sbb-action-group></sbb-action-group>`);
    });

    it('removes bound [align-group] attribute', () => {
      const input = `<sbb-action-group [align-group]="myAlign"></sbb-action-group>`;
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toBe(`<sbb-action-group></sbb-action-group>`);
    });

    it('removes static horizontal-from attribute', () => {
      const input = `<sbb-action-group horizontal-from="medium"></sbb-action-group>`;
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toContain(`<sbb-action-group></sbb-action-group>`);
    });

    it('removes bound [horizontal-from] attribute', () => {
      const input = `<sbb-action-group [horizontal-from]="myBreakpoint"></sbb-action-group>`;
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toContain(`<sbb-action-group></sbb-action-group>`);
    });

    it('removes multiple layout attributes at once', () => {
      const input = `<sbb-action-group align-group="center" horizontal-from="medium"></sbb-action-group>`;
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toContain(`<sbb-action-group></sbb-action-group>`);
    });

    it('removes layout attributes from sbb-dialog-actions', () => {
      const input = `<sbb-dialog-actions align-group="center" horizontal-from="medium"></sbb-dialog-actions>`;
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toContain(`<sbb-dialog-actions></sbb-dialog-actions>`);
    });

    it('preserves unrelated attributes when removing layout attributes', () => {
      const input = `<sbb-action-group class="my-group" align-group="center" horizontal-from="medium" id="actions"></sbb-action-group>`;
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toContain(
        `<sbb-action-group class="my-group" id="actions"></sbb-action-group>`,
      );
    });
  });

  describe('buttonSize propagation', () => {
    it('propagates static buttonSize to sbb-button child and removes it from host', () => {
      const input = `
<sbb-action-group buttonSize="m">
  <sbb-button>Label</sbb-button>
</sbb-action-group>
      `.trim();
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toContain('<sbb-button size="m">');
      expect(output).not.toContain('buttonSize');
    });

    it('propagates static buttonSize to all button variant children', () => {
      const input = `
<sbb-action-group buttonSize="m">
  <sbb-button>Primary</sbb-button>
  <sbb-secondary-button>Secondary</sbb-secondary-button>
  <sbb-transparent-button>Transparent</sbb-transparent-button>
  <sbb-accent-button>Accent</sbb-accent-button>
</sbb-action-group>
      `.trim();
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toContain('<sbb-button size="m">');
      expect(output).toContain('<sbb-secondary-button size="m">');
      expect(output).toContain('<sbb-transparent-button size="m">');
      expect(output).toContain('<sbb-accent-button size="m">');
      expect(output).not.toContain('buttonSize');
    });

    it('propagates static buttonSize to static button variant children', () => {
      const input = `
<sbb-action-group buttonSize="m">
  <sbb-button-static>Primary</sbb-button-static>
  <sbb-secondary-button-static>Secondary</sbb-secondary-button-static>
</sbb-action-group>
      `.trim();
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toContain('<sbb-button-static size="m">');
      expect(output).toContain('<sbb-secondary-button-static size="m">');
      expect(output).not.toContain('buttonSize');
    });

    it('propagates bound [buttonSize] to children as [size]', () => {
      const input = `
<sbb-action-group [buttonSize]="mySize">
  <sbb-button>Label</sbb-button>
</sbb-action-group>
      `.trim();
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toContain('<sbb-button [size]="mySize">');
      expect(output).not.toContain('buttonSize');
    });

    it('replaces existing size on child when propagating buttonSize', () => {
      const input = `
<sbb-action-group buttonSize="m">
  <sbb-button size="s">Label</sbb-button>
</sbb-action-group>
      `.trim();
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toContain('<sbb-button size="m">');
      expect(output).not.toContain('size="s"');
      expect(output).not.toContain('buttonSize');
    });

    it('does not propagate buttonSize to link children', () => {
      const input = `
<sbb-action-group buttonSize="m">
  <sbb-button-link>Link</sbb-button-link>
</sbb-action-group>
      `.trim();
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).not.toContain('<sbb-button-link size=');
      expect(output).not.toContain('buttonSize');
    });
  });

  describe('linkSize propagation', () => {
    it('propagates static linkSize to sbb-button-link child and removes it from host', () => {
      const input = `
<sbb-action-group linkSize="m">
  <sbb-button-link>Link</sbb-button-link>
</sbb-action-group>
      `.trim();
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toContain('<sbb-button-link size="m">');
      expect(output).not.toContain('linkSize');
    });

    it('propagates static linkSize to all link variant children', () => {
      const input = `
<sbb-action-group linkSize="m">
  <sbb-button-link>Primary</sbb-button-link>
  <sbb-secondary-button-link>Secondary</sbb-secondary-button-link>
  <sbb-transparent-button-link>Transparent</sbb-transparent-button-link>
  <sbb-accent-button-link>Accent</sbb-accent-button-link>
</sbb-action-group>
      `.trim();
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toContain('<sbb-button-link size="m">');
      expect(output).toContain('<sbb-secondary-button-link size="m">');
      expect(output).toContain('<sbb-transparent-button-link size="m">');
      expect(output).toContain('<sbb-accent-button-link size="m">');
      expect(output).not.toContain('linkSize');
    });

    it('propagates bound [linkSize] to children as [size]', () => {
      const input = `
<sbb-action-group [linkSize]="mySize">
  <sbb-button-link>Link</sbb-button-link>
</sbb-action-group>
      `.trim();
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toContain('<sbb-button-link [size]="mySize">');
      expect(output).not.toContain('linkSize');
    });

    it('replaces existing size on child when propagating linkSize', () => {
      const input = `
<sbb-action-group linkSize="m">
  <sbb-button-link size="s">Link</sbb-button-link>
</sbb-action-group>
      `.trim();
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toContain('<sbb-button-link size="m">');
      expect(output).not.toContain('size="s"');
      expect(output).not.toContain('linkSize');
    });

    it('does not propagate linkSize to button children', () => {
      const input = `
<sbb-action-group linkSize="m">
  <sbb-button>Button</sbb-button>
</sbb-action-group>
      `.trim();
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).not.toContain('<sbb-button size=');
      expect(output).not.toContain('linkSize');
    });
  });

  describe('buttonSize and linkSize together', () => {
    it('propagates both buttonSize and linkSize to respective children', () => {
      const input = `
<sbb-action-group buttonSize="m" linkSize="s">
  <sbb-button>Button</sbb-button>
  <sbb-button-link>Link</sbb-button-link>
</sbb-action-group>
      `.trim();
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toContain('<sbb-button size="m">');
      expect(output).toContain('<sbb-button-link size="s">');
      expect(output).not.toContain('buttonSize');
      expect(output).not.toContain('linkSize');
    });
  });

  describe('combined removals and propagation', () => {
    it('removes layout attributes and propagates buttonSize in one pass', () => {
      const input = `
<sbb-action-group orientation="horizontal" buttonSize="m" alignGroup="center">
  <sbb-button>Label</sbb-button>
</sbb-action-group>
      `.trim();
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).not.toContain('orientation="horizontal"');
      expect(output).not.toContain('alignGroup="center"');
      expect(output).not.toContain('buttonSize="m"');
      expect(output).toContain('<sbb-button size="m">');
      expect(output).toContain('FIXME: orientation has been removed.');
    });
  });

  describe('nested action groups', () => {
    it('handles nested sbb-action-group correctly', () => {
      const input = `
<sbb-action-group buttonSize="m">
  <sbb-button>Outer</sbb-button>
  <sbb-action-group buttonSize="s">
    <sbb-button>Inner</sbb-button>
  </sbb-action-group>
</sbb-action-group>
      `.trim();
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).not.toContain('buttonSize');
    });
  });

  describe('sbb-dialog-actions', () => {
    it('propagates buttonSize to children in sbb-dialog-actions', () => {
      const input = `
<sbb-dialog-actions buttonSize="m">
  <sbb-button>Confirm</sbb-button>
</sbb-dialog-actions>
      `.trim();
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toContain('<sbb-button size="m">');
      expect(output).not.toContain('buttonSize');
    });

    it('removes layout attributes from sbb-dialog-actions', () => {
      const input = `
<sbb-dialog-actions orientation="horizontal" alignGroup="end">
  <sbb-button>Confirm</sbb-button>
</sbb-dialog-actions>
      `.trim();
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).not.toContain('orientation="horizontal"');
      expect(output).not.toContain('alignGroup="end"');
      expect(output).toContain('<sbb-button>Confirm</sbb-button>');
      expect(output).toContain('FIXME: orientation has been removed.');
    });
  });

  describe('unaffected elements', () => {
    it('does not touch other elements', () => {
      const input = `<sbb-button buttonSize="m">Label</sbb-button>`;
      const output = testMigration(MigrateActionGroupProperties, 'html', input);
      expect(output).toBe(input);
    });
  });

  describe('inline template in .ts file', () => {
    it('removes orientation from inline template', () => {
      const input = `
@Component({
  template: '<sbb-action-group orientation="horizontal"><sbb-button>Label</sbb-button></sbb-action-group>',
})
export class TestComponent {}
      `.trim();
      const output = testMigration(MigrateActionGroupProperties, 'ts', input);
      expect(output).not.toContain('orientation="horizontal"');
      expect(output).toContain('<sbb-action-group>');
      expect(output).toContain('FIXME: orientation has been removed.');
    });

    it('propagates buttonSize to children in inline template', () => {
      const input = `
@Component({
  template: \`
    <sbb-action-group buttonSize="m">
      <sbb-button>Label</sbb-button>
    </sbb-action-group>
  \`,
})
export class TestComponent {}
      `.trim();
      const output = testMigration(MigrateActionGroupProperties, 'ts', input);
      expect(output).toContain('<sbb-button size="m">');
      expect(output).not.toContain('buttonSize');
    });
  });
});
