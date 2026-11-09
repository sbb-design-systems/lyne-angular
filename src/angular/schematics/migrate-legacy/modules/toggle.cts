import { TmplAstElement, TmplAstText } from '@angular/compiler';

import type { MigrationScope } from '../../utils.cjs';
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
  { oldImport: '@sbb-esta/angular/toggle', newImport: '@sbb-esta/lyne-angular/toggle' },
];

const comments: CommentMigration[] = [
  {
    selector: 'sbb-toggle-subtitle',
    message: 'FIXME: this component has no counterpart in Lyne.',
  },
  {
    selector: 'sbb-toggle-details',
    message: 'FIXME: this component has no counterpart in Lyne.',
  },
  {
    selector: 'sbb-toggle-icon',
    message:
      'FIXME: this component has no counterpart in Lyne. You can use the `iconName` input of `sbb-toggle-option`.',
  },
  {
    selector: 'sbb-toggle[selected]',
    message: 'FIXME: this `selected` input has no counterpart in Lyne.',
  },
  {
    selector: 'sbb-toggle-option[subtitle]',
    message: 'FIXME: this `selected` input has no counterpart in Lyne.',
  },
];

const types: TypeMigration[] = [{ from: 'SbbRadioChange', to: 'Event', skipImports: true }];

const selectors: SelectorMigration[] = [{ selector: 'sbb-toggle-icon', replaceWith: 'sbb-alert' }];

const attributes: AttributeMigration[] = [
  { selector: 'sbb-toggle-option', attribute: 'svgIcon', replaceWith: 'iconName' },
];

const OPTION = 'sbb-toggle-option';

/** `<sbb-toggle-label>text</sbb-toggle-label>` => `text`. */
export const unwrapToggleLabelMigration = (scope?: MigrationScope) =>
  createTemplateMigrationRule((element, context) => {
    if (element.name !== 'sbb-toggle-label') {
      return;
    }

    const { start, end } = element.startSourceSpan;
    context.edits.push({
      offset: context.baseOffset + start.offset,
      index: context.nextIndex(),
      length: end.offset - start.offset,
      log: () => context.logger.info(`  → Unwrapped 'sbb-toggle-label' in ${context.filePath}`),
    });
    const close = element.endSourceSpan;
    if (close && close.start.offset !== start.offset) {
      context.edits.push({
        offset: context.baseOffset + close.start.offset,
        index: context.nextIndex(),
        length: close.end.offset - close.start.offset,
      });
    }
  }, scope);

/** `<sbb-toggle-option label="x">` => `<sbb-toggle-option>x</sbb-toggle-option>`; `[label]="e"` => `{{ e }}`. */
export const toggleOptionLabelMigration = (scope?: MigrationScope) =>
  createTemplateMigrationRule((element, context) => {
    if (element.name !== OPTION) {
      return;
    }

    const staticLabel = element.attributes.find((attribute) => attribute.name === 'label');
    const boundLabel = element.inputs.find((input) => input.name === 'label');
    const node = staticLabel ?? boundLabel;
    const valueSpan = node?.valueSpan;

    // Existing content wins over the label in the legacy component, so it is left alone.
    const hasContent = element.children.some(
      (child) =>
        child instanceof TmplAstElement || !(child instanceof TmplAstText) || child.value.trim(),
    );
    if (!node || !valueSpan || hasContent) {
      return;
    }

    const raw = context.content.slice(valueSpan.start.offset, valueSpan.end.offset);
    const text = boundLabel && !staticLabel ? `{{ ${raw.trim()} }}` : raw;

    const startTag = element.startSourceSpan;
    const close = element.endSourceSpan;
    const selfClosing =
      context.content.slice(startTag.end.offset - 2, startTag.end.offset) === '/>';
    if (selfClosing) {
      const tagEnd = startTag.end.offset - 2;
      const from = context.content.slice(0, tagEnd).trimEnd().length;
      context.edits.push({
        offset: context.baseOffset + from,
        index: context.nextIndex(),
        length: startTag.end.offset - from,
        insertion: `>${text}</${OPTION}>`,
      });
    } else if (close && close.start.offset !== startTag.start.offset) {
      context.edits.push({
        offset: context.baseOffset + startTag.end.offset,
        index: context.nextIndex(),
        length: close.start.offset - startTag.end.offset,
        insertion: text,
      });
    } else {
      return;
    }

    queueAttributeRemoval(
      context.content,
      context.baseOffset,
      node.sourceSpan.start.offset,
      node.sourceSpan.end.offset,
      context.edits,
      context.nextIndex,
      () =>
        context.logger.info(
          `  → Moved 'label' into the content of '${OPTION}' in ${context.filePath}`,
        ),
    );
  }, scope);

/**
 * Migrate the tooltip module (including expansion-panel)
 *
 * Transformations:
 * 1. ✓ Rewrite import paths
 * 2. ✓ Mark unsupported inputs and components with a comment
 * 3. ✓ Convert inputs to new names
 * 4. ✓ Unwrap `sbb-toggle-label`
 * 5. ✓ Move the `label` input of `sbb-toggle-option` into its content
 */
export const TOGGLE_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  types,
  selectors,
  attributes,
  customRules: [unwrapToggleLabelMigration, toggleOptionLabelMigration],
};
