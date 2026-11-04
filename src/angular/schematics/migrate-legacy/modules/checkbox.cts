import type { Rule } from '@angular-devkit/schematics';

import type { MigrationScope } from '../../utils.cjs';
import type { CommentMigration, ImportRewriteOptions, ModuleMigrations } from '../common.cjs';
import { createTemplateMigrationRule, queueAttributeRemoval } from '../template-migration.cjs';

const importPaths: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/checkbox', newImport: '@sbb-esta/lyne-angular/checkbox' },
];

const comments: CommentMigration[] = [
  {
    selector: 'sbb-checkbox[labelPosition]',
    message: 'FIXME: the `labelPosition` input does not exist in Lyne.',
  },
  {
    selector: 'sbb-checkbox[indeterminateChange]',
    message: 'FIXME: the `indeterminateChange` event does not exist in Lyne.',
  },
  {
    symbol: 'SBB_CHECKBOX_DEFAULT_OPTIONS',
    message: 'FIXME: SBB_CHECKBOX_DEFAULT_OPTIONS does not exist in Lyne.',
  },
];

const GROUP_CLASSES: Record<string, string> = {
  'sbb-checkbox-group-vertical': 'vertical',
  'sbb-checkbox-group-horizontal': 'horizontal',
} as const;

/**
 * Creates a rule which turns every element with the `sbb-checkbox-group-vertical|horizontal` class
 * into `<sbb-checkbox-group orientation="...">`, dropping the class and keeping all other attributes.
 */
export function convertWrapperToCheckboxGroupMigration(scope?: MigrationScope): Rule {
  return createTemplateMigrationRule((element, context) => {
    const { content, baseOffset, edits, nextIndex, filePath, logger } = context;
    const classAttribute = element.attributes.find(({ name }) => name === 'class');
    const endTag = element.endSourceSpan;
    if (!classAttribute?.valueSpan || !endTag || !content.startsWith('</', endTag.start.offset)) {
      return;
    }

    const classes = classAttribute.value.split(/\s+/).filter(Boolean);
    const groupClass = classes.find((name) => name in GROUP_CLASSES);
    if (!groupClass) {
      return;
    }

    const startTag = element.startSourceSpan;
    const remaining = classes.filter((name) => name !== groupClass);
    const edit = (offset: number, length: number, insertion: string, log?: () => void) =>
      edits.push({ offset: baseOffset + offset, index: nextIndex(), length, insertion, log });

    edit(
      startTag.start.offset + 1,
      element.name.length,
      `sbb-checkbox-group orientation="${GROUP_CLASSES[groupClass]}"`,
      () =>
        logger.info(
          `  → Replaced <${element.name} class="${groupClass}"> with <sbb-checkbox-group> in ${filePath}`,
        ),
    );
    edit(endTag.start.offset + '</'.length, element.name.length, 'sbb-checkbox-group');

    // If there are other classes, we keep them in the class attribute. Otherwise, we remove the attribute completely.
    if (remaining.length) {
      const { start, end } = classAttribute.valueSpan;
      edit(start.offset, end.offset - start.offset, remaining.join(' '));
    } else {
      queueAttributeRemoval(
        content,
        baseOffset,
        classAttribute.sourceSpan.start.offset,
        classAttribute.sourceSpan.end.offset,
        edits,
        nextIndex,
      );
    }
  }, scope);
}

/**
 * Transformations:
 * 1. ✓ Rewrite import paths
 * 2. ✓ Add comments for unsupported inputs, outputs and symbols
 * 3. ✓ Convert wrapper elements to `<sbb-checkbox-group>`
 */
export const CHECKBOX_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  customRules: [convertWrapperToCheckboxGroupMigration],
};
