import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from '../migrations/template-selector-migration.cjs';
import { createTypeMigrationRule } from '../migrations/type-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { STEPPER_MIGRATIONS, stepLabelMigration } from './stepper.cjs';

describe('sbb-stepper', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, types, selectors, attributes } = STEPPER_MIGRATIONS;
    return chain([
      createImportPathMigrationRule(importPaths),
      createCommentMigrationRule(comments),
      createTypeMigrationRule(types),
      createTemplateSelectorMigrationRule(selectors),
      createAttributeMigrationRule(attributes),
      stepLabelMigration(),
    ]);
  };

  const migrateTsFile = (content: string) =>
    MigrateLegacyTestUtils.migrateTsFile(content, defaultMigration);
  const migrateTemplate = (template: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigration);

  describe('typescript', () => {
    it('should rewrite the import path and rename the types', async () => {
      const content = await migrateTsFile(
        [
          "import { SbbProcessflowModule, SbbProcessflow, SbbProcessflowNext, SbbProcessflowPrevious, SbbStep } from '@sbb-esta/angular/processflow';",
          'export const a = [SbbProcessflowModule, SbbProcessflow, SbbProcessflowNext, SbbProcessflowPrevious, SbbStep];',
        ].join('\n'),
      );
      expect(content).toContain(
        "import { SbbStepperModule, SbbStepper, SbbStepperNext, SbbStepperPrevious, SbbStep } from '@sbb-esta/lyne-angular/stepper';",
      );
      expect(content).toContain(
        'export const a = [SbbStepperModule, SbbStepper, SbbStepperNext, SbbStepperPrevious, SbbStep];',
      );
    });
  });

  describe('selectors and attributes', () => {
    it('should rename sbb-processflow', async () => {
      expect(await migrateTemplate('<sbb-processflow [linear]="l"></sbb-processflow>')).toBe(
        '<sbb-stepper [linear]="l"></sbb-stepper>',
      );
    });

    it('should migrate [sbbProcessflow] and remove the attribute', async () => {
      expect(await migrateTemplate('<div sbbProcessflow linear></div>')).toBe(
        '<sbb-stepper linear></sbb-stepper>',
      );
    });

    it('should rename the next and previous attributes', async () => {
      expect(
        await migrateTemplate(
          '<button sbbProcessflowPrevious>Back</button><button sbbProcessflowNext type="button">Next</button>',
        ),
      ).toBe(
        '<button sbb-stepper-previous>Back</button><button sbb-stepper-next type="button">Next</button>',
      );
    });

    it('should rename (selectionChange)', async () => {
      expect(
        await migrateTemplate('<sbb-processflow (selectionChange)="c($event)"></sbb-processflow>'),
      ).toBe('<sbb-stepper (stepchange)="c($event)"></sbb-stepper>');
    });

    it('should not rename selectionChange on other elements', async () => {
      const template = '<sbb-tab-group (selectionChange)="c()"></sbb-tab-group>';
      expect(await migrateTemplate(template)).toBe(template);
    });
  });

  describe('comments', () => {
    it.each([
      ['<sbb-step [stepControl]="c"></sbb-step>', 'stepControl'],
      ['<sbb-step-header></sbb-step-header>', 'sbb-step-header'],
      ['<sbb-step [completed]="c"></sbb-step>', 'completed'],
      ['<sbb-step [editable]="e"></sbb-step>', 'editable'],
      ['<sbb-step optional></sbb-step>', 'optional'],
      ['<sbb-step [hasError]="e"></sbb-step>', 'hasError'],
      ['<sbb-step errorMessage="e"></sbb-step>', 'errorMessage'],
      ['<sbb-processflow (animationDone)="d()"></sbb-processflow>', 'animationDone'],
      ['<div sbbProcessflow (animationDone)="d()"></div>', 'animationDone'],
    ])('should comment %s', async (template, name) => {
      expect(await migrateTemplate(template)).toContain(
        `FIXME: '${name}' has no counterpart in Lyne.`,
      );
    });

    it('should not comment a plain step', async () => {
      const template = '<sbb-step>Content</sbb-step>';
      expect(await migrateTemplate(template)).toBe(template);
    });
  });

  describe('step label', () => {
    it('should move a static label', async () => {
      expect(await migrateTemplate('<sbb-step label="Step 1">Content</sbb-step>')).toBe(
        '<sbb-step-label>Step 1</sbb-step-label>\n<sbb-step>Content</sbb-step>',
      );
    });

    it('should move a bound label', async () => {
      expect(await migrateTemplate('<sbb-step [label]="title" [x]="y">Content</sbb-step>')).toBe(
        '<sbb-step-label>{{ title }}</sbb-step-label>\n<sbb-step [x]="y">Content</sbb-step>',
      );
    });

    it('should keep the indentation', async () => {
      expect(
        await migrateTemplate(
          ['<sbb-processflow>', '  <sbb-step label="A">a</sbb-step>', '</sbb-processflow>'].join(
            '\n',
          ),
        ),
      ).toBe(
        [
          '<sbb-stepper>',
          '  <sbb-step-label>A</sbb-step-label>',
          '  <sbb-step>a</sbb-step>',
          '</sbb-stepper>',
        ].join('\n'),
      );
    });

    it('should move a label template', async () => {
      expect(
        await migrateTemplate(
          [
            '<sbb-processflow>',
            '  <sbb-step>',
            '    <ng-template sbbStepLabel>Step <b>1</b></ng-template>',
            '    <p>Content</p>',
            '  </sbb-step>',
            '</sbb-processflow>',
          ].join('\n'),
        ),
      ).toBe(
        [
          '<sbb-stepper>',
          '  <sbb-step-label>Step <b>1</b></sbb-step-label>',
          '  <sbb-step>',
          '    <p>Content</p>',
          '  </sbb-step>',
          '</sbb-stepper>',
        ].join('\n'),
      );
    });

    it('should prefer the label template over the label attribute', async () => {
      expect(
        await migrateTemplate(
          '<sbb-step label="A"><ng-template sbbStepLabel>B</ng-template>x</sbb-step>',
        ),
      ).toBe('<sbb-step-label>B</sbb-step-label>\n<sbb-step>x</sbb-step>');
    });

    it('should not touch lazy content templates or steps without label', async () => {
      const template = '<sbb-step><ng-template sbbStepContent>x</ng-template></sbb-step>';
      expect(await migrateTemplate(template)).toBe(template);
    });
  });
});
