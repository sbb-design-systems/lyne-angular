import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from '../migrations/template-selector-migration.cjs';
import { createTypeMigrationRule } from '../migrations/type-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { TOOLTIP_MIGRATIONS } from './tooltip.cjs';

describe('sbb-tooltip', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, types, attributes, selectors, customRules } = TOOLTIP_MIGRATIONS;
    return chain([
      createImportPathMigrationRule(importPaths),
      createCommentMigrationRule(comments),
      createTypeMigrationRule(types),
      createTemplateSelectorMigrationRule(selectors),
      createAttributeMigrationRule(attributes),
      ...customRules!.map((rule) => rule()),
    ]);
  };

  const migrateTsFile = (content: string) =>
    MigrateLegacyTestUtils.migrateTsFile(content, defaultMigration);
  const migrateTemplate = (template: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigration);

  describe('imports', () => {
    it('should rewrite the import path', async () => {
      expect(
        await migrateTsFile(`import { SbbTooltipModule } from '@sbb-esta/angular/tooltip';`),
      ).toContain(`from '@sbb-esta/lyne-angular/tooltip'`);
    });
  });

  describe('types and symbols', () => {
    it('should replace SbbTooltipChangeEvent with Event, keeping the import', async () => {
      const result = await migrateTsFile(
        [
          `import { SbbTooltipChangeEvent } from '@sbb-esta/angular/tooltip';`,
          'export function f(e: SbbTooltipChangeEvent) {}',
        ].join('\n'),
      );
      expect(result).to.be.equal('export function f(e: Event) {}');
    });

    it('should add a FIXME on SBB_TOOLTIP_DEFAULT_OPTIONS', async () => {
      const result = await migrateTsFile(
        [
          `import { SBB_TOOLTIP_DEFAULT_OPTIONS } from '@sbb-esta/angular/tooltip';`,
          'export const p = { provide: SBB_TOOLTIP_DEFAULT_OPTIONS, useValue: {} };',
        ].join('\n'),
      );
      expect(result).toContain('FIXME: SBB_TOOLTIP_DEFAULT_OPTIONS does not exist in Lyne.');
    });
  });

  describe('FIXME comments', () => {
    it.each([
      ['<span sbbTooltip="a" [sbbTooltipClass]="c"></span>', 'sbbTooltipClass'],
      ['<span sbbTooltip="a" sbbTooltipPanelClass="c"></span>', 'sbbTooltipPanelClass'],
      ['<span sbbTooltip="a" sbbTooltipTouchGestures="auto"></span>', 'sbbTooltipTouchGestures'],
      ['<span sbbTooltip="a" [sbbTooltipDisabled]="d"></span>', 'sbbTooltipDisabled'],
      ['<span sbbTooltip="a" sbbTooltipPosition="above"></span>', 'position'],
      ['<sbb-tooltip position="above">A</sbb-tooltip>', 'position'],
      ['<sbb-tooltip disabled>A</sbb-tooltip>', 'disabled'],
    ])('should flag %s', async (template, input) => {
      expect(await migrateTemplate(template)).toContain(`FIXME: the \`${input}\` input`);
    });

    it('should not flag unrelated usage', async () => {
      const template = '<span sbbTooltip="a" sbbTooltipShowDelay="1"></span>';
      expect(await migrateTemplate(template)).not.toContain('FIXME');
    });
  });

  describe('attributes', () => {
    it('should rename the [sbbTooltip] delays', async () => {
      expect(
        await migrateTemplate(
          '<span sbbTooltip="a" sbbTooltipShowDelay="1" [sbbTooltipHideDelay]="2"></span>',
        ),
      ).toBe(
        '<span sbbTooltip="a" sbb-tooltip-open-delay="1" [sbb-tooltip-close-delay]="2"></span>',
      );
    });

    it('should rename the sbb-tooltip delays and outputs', async () => {
      const result = await migrateTemplate(
        '<sbb-tooltip hoverShowDelay="1" hoverHideDelay="2" (opened)="a()" (dismissed)="b()">A</sbb-tooltip>',
      );
      expect(result).toContain('openDelay="1" closeDelay="2" (open)="a()" (close)="b()"');
    });

    it('should convert trigger="hover" into hoverTrigger', async () => {
      expect(await migrateTemplate('<sbb-tooltip trigger="hover">A</sbb-tooltip>')).toContain(
        '<sbb-popover #popover="sbbPopover" hoverTrigger>A</sbb-popover>',
      );
    });

    it('should remove trigger="click"', async () => {
      expect(await migrateTemplate('<sbb-tooltip trigger="click">A</sbb-tooltip>')).toContain(
        '<sbb-popover #popover="sbbPopover">A</sbb-popover>',
      );
    });
  });

  describe('<sbb-tooltip> migration', () => {
    it('sbb-tooltip into mini-button + popover', async () => {
      const result = await migrateTemplate('<sbb-tooltip>Tooltip content</sbb-tooltip>');
      expect(result).toBe(
        [
          '<sbb-mini-button [sbbPopover]="popover" iconName="circle-information-small"></sbb-mini-button>\n',
          '<sbb-popover #popover="sbbPopover">Tooltip content</sbb-popover>',
        ].join(''),
      );
    });

    it('moving iconName to the button and keeping other attributes', async () => {
      const result = await migrateTemplate(
        [
          '<div>',
          '  <sbb-tooltip svgIcon="x-small" id="t" [class.a]="d">Hi</sbb-tooltip>',
          '</div>',
        ].join('\n'),
      );
      expect(result).toBe(
        [
          '<div>',
          '  <sbb-mini-button [sbbPopover]="popover" iconName="x-small"></sbb-mini-button>',
          '  <sbb-popover #popover="sbbPopover" id="t" [class.a]="d">Hi</sbb-popover>',
          '</div>',
        ].join('\n'),
      );
    });

    it('moving a bound iconName', async () => {
      const result = await migrateTemplate('<sbb-tooltip [svgIcon]="icon">Hi</sbb-tooltip>');
      expect(result).toContain('<sbb-mini-button [sbbPopover]="popover" [iconName]="icon">');
      expect(result).toContain('<sbb-popover #popover="sbbPopover">Hi</sbb-popover>');
    });

    it('using unique template variables for multiple tooltips', async () => {
      const result = await migrateTemplate(
        ['<sbb-tooltip>A</sbb-tooltip>', '<sbb-tooltip>B</sbb-tooltip>'].join('\n'),
      );
      expect(result).toContain('#popover="sbbPopover">A');
      expect(result).toContain('#popover2="sbbPopover">B');
      expect(result).toContain('[sbbPopover]="popover2"');
    });

    it('should be idempotent', async () => {
      const once = await migrateTemplate('<sbb-tooltip>Hi</sbb-tooltip>');
      expect(await migrateTemplate(once)).toBe(once);
    });
  });

  describe('[sbbTooltip] directive migration', () => {
    it('with a template ref into sbb-tooltip', async () => {
      const result = await migrateTemplate(
        [
          '<span [sbbTooltip]="tooltipContent"></span>',
          '<ng-template #tooltipContent>',
          '  Content',
          '</ng-template>',
        ].join('\n'),
      );
      expect(result).toBe(
        [
          '<span [sbbTooltip]="tooltipContent"></span>',
          '<sbb-tooltip #tooltipContent="sbbTooltip">',
          '  Content',
          '</sbb-tooltip>',
        ].join('\n'),
      );
    });

    it('with the ng-template declared before the trigger', async () => {
      const result = await migrateTemplate(
        '<ng-template #t>Hi</ng-template><span [sbbTooltip]="t"></span>',
      );
      expect(result).toBe(
        '<sbb-tooltip #t="sbbTooltip">Hi</sbb-tooltip><span [sbbTooltip]="t"></span>',
      );
    });

    it('once when the template is shared', async () => {
      const result = await migrateTemplate(
        [
          '<span [sbbTooltip]="t"></span>',
          '<b [sbbTooltip]="t"></b>',
          '<ng-template #t>Hi</ng-template>',
        ].join('\n'),
      );
      expect(result.match(/<sbb-tooltip/g)).toHaveLength(1);
    });

    it('and be idempotent without touching the new sbb-tooltip', async () => {
      const once = await migrateTemplate(
        '<span [sbbTooltip]="t"></span><ng-template #t>Hi</ng-template>',
      );
      expect(await migrateTemplate(once)).toBe(once);
    });

    it('not for text values', async () => {
      const template = [
        '<span sbbTooltip="text"></span>',
        `<span [sbbTooltip]="'text'"></span>`,
        '<span [sbbTooltip]="label"></span>',
      ].join('\n');
      expect(await migrateTemplate(template)).toBe(template);
    });

    it('not for an unrelated ng-template', async () => {
      const template = '<span [sbbTooltip]="a"></span><ng-template #b>Hi</ng-template>';
      expect(await migrateTemplate(template)).toBe(template);
    });
  });
});
