import { ASTWithSource, BindingType, Interpolation } from '@angular/compiler';
import type { Rule } from '@angular-devkit/schematics';

import type { MigrationScope } from '../../utils.cjs';
import { getIndent, getLineStart } from '../../utils.cjs';
import type { ImportRewriteOptions, ModuleMigrations, SelectorMigration } from '../common.cjs';
import {
  createTemplateMigrationRule,
  elementMatches,
  parseSelector,
  queueAttributeRemoval,
} from '../template-migration.cjs';

/**
 * Custom rule for form-field migration:
 * - removes the `label` attribute and adds a label tag when it has a value;
 */
function createFormFieldMigrationRule(scope?: MigrationScope): Rule {
  const selector = parseSelector('sbb-form-field');

  return createTemplateMigrationRule((element, context) => {
    if (!elementMatches(element, selector)) {
      return;
    }

    const { content, baseOffset, edits, nextIndex, filePath, logger } = context;
    const staticLabel = element.attributes.find((attribute) => attribute.name === 'label');
    const boundLabel = element.inputs.find(
      (input) => input.name === 'label' && input.type === BindingType.Property,
    );
    const label = staticLabel ?? boundLabel;
    if (!label) {
      return;
    }

    queueAttributeRemoval(
      content,
      baseOffset,
      label.sourceSpan.start.offset,
      label.sourceSpan.end.offset,
      edits,
      nextIndex,
      () => logger.info(`  → Removed 'label' from 'sbb-form-field' in ${filePath}`),
    );

    const value = label.valueSpan
      ? content.slice(label.valueSpan.start.offset, label.valueSpan.end.offset)
      : '';
    if (!value) {
      return;
    }

    const text =
      boundLabel &&
      label === boundLabel &&
      !(boundLabel.value instanceof ASTWithSource && boundLabel.value.ast instanceof Interpolation)
        ? `{{ ${value} }}`
        : value;
    const start = element.startSourceSpan.start.offset;
    const end = element.startSourceSpan.end.offset;
    const close = element.endSourceSpan?.start.offset;
    const multiline =
      close !== undefined && getLineStart(content, start) !== getLineStart(content, close);
    const indent = getIndent(content, getLineStart(content, start));
    const nextLineIndent = /^[ \t]*\r?\n([ \t]*)(?=\S)/.exec(content.slice(end))?.[1];
    const childIndent =
      nextLineIndent?.startsWith(indent) && nextLineIndent.length > indent.length
        ? nextLineIndent
        : `${indent}  `;
    const newline = content.slice(start, close).includes('\r\n') ? '\r\n' : '\n';
    edits.push({
      offset: baseOffset + end,
      index: nextIndex(),
      length: 0,
      insertion: `${multiline ? `${newline}${childIndent}` : ''}<label>${text.replaceAll('<', '&lt;')}</label>`,
      log: () => logger.info(`  → Moved 'label' into 'sbb-form-field' in ${filePath}`),
    });
  }, scope);
}

const importPaths: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/form-field', newImport: '@sbb-esta/lyne-angular/form-field' },
];

const selectors: SelectorMigration[] = [{ selector: 'sbb-label', replaceWith: 'label' }];

export const FORM_FIELD_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  selectors,
  customRules: [(scope?: MigrationScope) => createFormFieldMigrationRule(scope)],
};
