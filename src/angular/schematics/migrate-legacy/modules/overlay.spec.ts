import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from '../migrations/template-selector-migration.cjs';
import { createTypeMigrationRule } from '../migrations/type-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { OVERLAY_MIGRATIONS } from './overlay.cjs';

describe('sbb-overlay', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, types, selectors, attributes } = OVERLAY_MIGRATIONS;
    return chain([
      createImportPathMigrationRule(importPaths),
      createCommentMigrationRule(comments),
      createTypeMigrationRule(types),
      createTemplateSelectorMigrationRule(selectors),
      createAttributeMigrationRule(attributes),
    ]);
  };

  const migrateTsFile = (content: string) =>
    MigrateLegacyTestUtils.migrateTsFile(content, defaultMigration);
  const migrateTemplate = (template: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigration);

  it('should rewrite imports and rename symbols', async () => {
    const result = await migrateTsFile(
      [
        `import { SbbLightbox, SbbLightboxModule, SbbLightboxRef, SbbLightboxConfig, SBB_LIGHTBOX_DATA } from '@sbb-esta/angular/lightbox';`,
        'let a = [SbbLightbox, SbbLightboxModule, SbbLightboxRef, SbbLightboxConfig, SBB_LIGHTBOX_DATA];',
      ].join('\n'),
    );
    expect(result).toContain(`from '@sbb-esta/lyne-angular/overlay'`);
    for (const name of [
      'SbbOverlayService',
      'SbbOverlayModule',
      'SbbOverlayRef',
      'SbbOverlayConfig',
      'SBB_OVERLAY_DATA',
    ]) {
      expect(result).toContain(name);
    }
    expect(result).not.toContain('Lightbox');
    expect(result).not.toContain('LIGHTBOX');
  });

  it.each([
    ['SbbLightbox', 'service'],
    ['SbbLightboxRef', 'ref'],
    ['SbbLightboxConfig', 'config'],
  ])('should add a documentation comment for %s', async (symbol, what) => {
    const result = await migrateTsFile(
      [`import { ${symbol} } from '@sbb-esta/angular/lightbox';`, `let x = ${symbol};`].join('\n'),
    );
    expect(result).toContain(`FIXME: the ${what} API changed. Check the documentation.`);
  });

  it.each(['SBB_LIGHTBOX_DEFAULT_OPTIONS', 'SBB_LIGHTBOX_SCROLL_STRATEGY'])(
    'should comment %s',
    async (symbol) => {
      const result = await migrateTsFile(
        [`import { ${symbol} } from '@sbb-esta/angular/lightbox';`, `let x = ${symbol};`].join(
          '\n',
        ),
      );
      expect(result).toContain(`FIXME: ${symbol} does not exist in Lyne.`);
    },
  );

  it('should rename the lightbox elements', async () => {
    const result = await migrateTemplate(
      [
        '<sbb-lightbox-title>T</sbb-lightbox-title>',
        '<sbb-lightbox-content>C</sbb-lightbox-content>',
        '<sbb-lightbox-actions>A</sbb-lightbox-actions>',
      ].join('\n'),
    );
    expect(result).toContain('<sbb-title>T</sbb-title>');
    expect(result).toContain('<div>C</div>');
    expect(result).toContain('<sbb-action-group>A</sbb-action-group>');
  });

  it('should remove the directive attributes', async () => {
    const result = await migrateTemplate(
      [
        '<h2 sbb-lightbox-title>T</h2>',
        '<div sbbLightboxContent>C</div>',
        '<div sbb-lightbox-actions>A</div>',
      ].join('\n'),
    );
    expect(result).toContain('<h2>T</h2>');
    expect(result).toContain('<div>C</div>');
    expect(result).toContain('<div>A</div>');
  });

  it('should rename the close directive', async () => {
    const result = await migrateTemplate(
      '<button sbb-lightbox-close>a</button><button [sbbLightboxClose]="r">b</button>',
    );
    expect(result).toContain('sbb-overlay-close');
    expect(result).toContain('[sbbOverlayClose]="r"');
    expect(result).not.toContain('ightbox');
  });

  it('should comment closeAriaLabel on the title', async () => {
    const result = await migrateTemplate(
      '<sbb-lightbox-title closeAriaLabel="x">T</sbb-lightbox-title>',
    );
    expect(result).toContain('FIXME: the `closeAriaLabel` input');
    expect(result).toContain('<sbb-title');
  });
});
