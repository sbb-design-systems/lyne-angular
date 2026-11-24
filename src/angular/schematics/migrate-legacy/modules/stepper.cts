import type { TmplAstElement } from '@angular/compiler';

import type { MigrationScope } from '../../utils.cjs';
import { visitElements } from '../../utils.cjs';
import type {
  AttributeMigration,
  CommentMigration,
  ImportRewriteOptions,
  ModuleMigrations,
  SelectorMigration,
  TypeMigration,
} from '../common.cjs';
import { createTemplateMigrationRule, queueAttributeRemoval } from '../template-migration.cjs';

const importPaths: ImportRewriteOptions[] = [
  {
    oldImport: '@sbb-esta/angular/processflow',
    newImport: '@sbb-esta/lyne-angular/stepper',
  },
];

const noCounterpart = (selector: string, name: string): CommentMigration => ({
  selector,
  message: `FIXME: '${name}' has no counterpart in Lyne.`,
});

const comments: CommentMigration[] = [
  noCounterpart('sbb-step-header', 'sbb-step-header'),
  noCounterpart('sbb-step[stepControl]', 'stepControl'),
  noCounterpart('sbb-step[completed]', 'completed'),
  noCounterpart('sbb-step[editable]', 'editable'),
  noCounterpart('sbb-step[optional]', 'optional'),
  noCounterpart('sbb-step[hasError]', 'hasError'),
  noCounterpart('sbb-step[errorMessage]', 'errorMessage'),
  noCounterpart('sbb-processflow[animationDone], [sbbProcessflow][animationDone]', 'animationDone'),
];

const types: TypeMigration[] = [
  { from: 'SbbProcessflowModule', to: 'SbbStepperModule' },
  { from: 'SbbProcessflow', to: 'SbbStepper' },
  { from: 'SbbProcessflowNext', to: 'SbbStepperNext' },
  { from: 'SbbProcessflowPrevious', to: 'SbbStepperPrevious' },
];

const selectors: SelectorMigration[] = [
  { selector: 'sbb-processflow, [sbbProcessflow]', replaceWith: 'sbb-stepper' },
];

const attributes: AttributeMigration[] = [
  { selector: 'sbb-stepper', attribute: 'sbbProcessflow' },
  {
    selector: '[sbbProcessflowNext]',
    attribute: 'sbbProcessflowNext',
    replaceWith: 'sbb-stepper-next',
  },
  {
    selector: '[sbbProcessflowPrevious]',
    attribute: 'sbbProcessflowPrevious',
    replaceWith: 'sbb-stepper-previous',
  },
  {
    selector: 'sbb-stepper',
    attribute: 'selectionChange',
    replaceWith: 'stepchange',
  },
];

/**
 * Moves the label of a `<sbb-step>` (`label` attribute or `<ng-template sbbStepLabel>`)
 * to a new `<sbb-step-label>` placed before the step. The template wins over the attribute.
 */
export const stepLabelMigration = (scope?: MigrationScope) =>
  createTemplateMigrationRule((element, context) => {
    if (element.name !== 'sbb-step') {
      return;
    }

    const { content, baseOffset, edits, nextIndex } = context;
    const label =
      element.attributes.find((a) => a.name === 'label') ??
      element.inputs.find((i) => i.name === 'label');
    let labelTemplate: TmplAstElement | undefined;
    visitElements(element.children, (child) => {
      if (
        child.name === 'ng-template' &&
        child.attributes.some((a) => a.name === 'sbbStepLabel') &&
        !labelTemplate
      ) {
        labelTemplate = child;
      }
    });
    if (!label && !labelTemplate) {
      return;
    }

    let labelContent = '';
    if (labelTemplate) {
      const { startSourceSpan, endSourceSpan, sourceSpan } = labelTemplate;
      labelContent = content
        .slice(startSourceSpan.end.offset, endSourceSpan?.start.offset ?? sourceSpan.end.offset)
        .trim();
      queueAttributeRemoval(
        content,
        baseOffset,
        sourceSpan.start.offset,
        sourceSpan.end.offset,
        edits,
        nextIndex,
      );
    } else if (label) {
      const text = label.valueSpan
        ? content.slice(label.valueSpan.start.offset, label.valueSpan.end.offset)
        : '';
      labelContent = element.inputs.includes(label as never) ? `{{ ${text} }}` : text;
    }

    if (label) {
      queueAttributeRemoval(
        content,
        baseOffset,
        label.sourceSpan.start.offset,
        label.sourceSpan.end.offset,
        edits,
        nextIndex,
      );
    }

    const start = element.startSourceSpan.start.offset;
    const linePrefix = content.slice(content.lastIndexOf('\n', start - 1) + 1, start);
    const separator = /^\s*$/.test(linePrefix) ? `\n${linePrefix}` : ' ';
    edits.push({
      offset: baseOffset + start,
      index: nextIndex(),
      length: 0,
      insertion: `<sbb-step-label>${labelContent}</sbb-step-label>${separator}`,
      log: () => context.logger.info(`  → Created 'sbb-step-label' in ${context.filePath}`),
    });
  }, scope);

/**
 * Migrate the process-flow module
 *
 * Transformations:
 * 1. ✓ Rewrite import paths
 * 2. ✓ Rename `SbbProcessflow*` symbols to `SbbStepper*`
 * 3. ✓ `sbb-processflow` and `[sbbProcessflow]` → `sbb-stepper`
 * 4. ✓ `sbbProcessflowNext|Previous` → `sbb-stepper-next|previous`, `(selectionChange)` → `(stepchange)`
 * 5. ✓ Mark inputs, outputs and symbols without a counterpart with a comment
 * 6. ✓ `<sbb-step label="x">` and `<ng-template sbbStepLabel>` → `<sbb-step-label>` before the step
 */
export const STEPPER_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  types,
  selectors,
  attributes,
  customRules: [stepLabelMigration],
};
