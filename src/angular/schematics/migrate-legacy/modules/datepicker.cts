import { BindingType, TmplAstElement, TmplAstText } from '@angular/compiler';
import type { Rule } from '@angular-devkit/schematics';

import type { MigrationScope } from '../../utils.cjs';
import { getIndent, getLineStart } from '../../utils.cjs';
import type {
  AttributeMigration,
  CommentMigration,
  ImportRewriteOptions,
  ModuleMigrations,
  SelectorMigration,
} from '../common.cjs';
import {
  attributeNameVariants,
  createTemplateMigrationRule,
  elementMatches,
  parseSelector,
  queueAttributeRemoval,
} from '../template-migration.cjs';

export const DEPRECATED_DATEPICKER_ATTRIBUTES = [
  'calendarHeaderComponent',
  'connected',
  'nextDayAriaLabel',
  'prevDayAriaLabel',
  'panelClass',
  'startAt',
];

function createDatepickerMigrationRule(scope?: MigrationScope): Rule {
  const selector = parseSelector('sbb-datepicker');

  return createTemplateMigrationRule((element, context) => {
    if (!elementMatches(element, selector)) {
      return;
    }

    const { content, baseOffset, inline, edits, nextIndex, filePath, logger } = context;
    const attributes = [
      ...element.attributes,
      ...element.inputs.filter(
        (input) => input.type === BindingType.Property || input.type === BindingType.Attribute,
      ),
    ];
    const findAttribute = (name: string) =>
      attributes.find((attribute) => attributeNameVariants(name).includes(attribute.name));
    const arrow = findAttribute('arrows');
    const toggle = findAttribute('toggle');
    const disabled = findAttribute('disabled');
    const tags: string[] = [];

    if (arrow) {
      tags.push('sbb-datepicker-previous-day', 'sbb-datepicker-next-day');
    }
    if (toggle) {
      tags.push('sbb-datepicker-toggle');
    }

    const removeAttribute = (attribute: (typeof attributes)[number]) =>
      queueAttributeRemoval(
        content,
        baseOffset,
        attribute.sourceSpan.start.offset,
        attribute.sourceSpan.end.offset,
        edits,
        nextIndex,
      );
    if (arrow) {
      removeAttribute(arrow);
    }
    if (toggle) {
      removeAttribute(toggle);
    }

    const disabledText = disabled
      ? ` ${content.slice(disabled.sourceSpan.start.offset, disabled.sourceSpan.end.offset)}`
      : '';
    const siblings = tags.map((tag) => `<${tag}${disabledText}></${tag}>`);
    if (disabled && tags.length > 0) {
      removeAttribute(disabled);
    }

    // The inputs leave the datepicker, in front of it. They were indented one level more.
    const start = element.startSourceSpan.start.offset;
    const indent = getIndent(content, getLineStart(content, start));
    const dedent = (text: string, from: number): string => {
      const extra = getIndent(content, getLineStart(content, from)).length - indent.length;
      return extra > 0 ? text.replace(new RegExp(`\\n[ \\t]{1,${extra}}`, 'g'), '\n') : text;
    };
    const dateInputs = element.children.filter(
      (child): child is TmplAstElement =>
        child instanceof TmplAstElement && child.name === 'sbb-date-input',
    );
    for (const child of dateInputs) {
      siblings.push(
        dedent(
          content.slice(child.sourceSpan.start.offset, child.sourceSpan.end.offset),
          child.sourceSpan.start.offset,
        ),
      );
    }

    // Nothing else inside: the empty datepicker does not keep the blanks around the inputs.
    const endSpan = element.endSourceSpan;
    const isEmptyAfterwards =
      dateInputs.length > 0 &&
      !!endSpan &&
      content.startsWith('</', endSpan.start.offset) &&
      element.children.every(
        (child) =>
          dateInputs.includes(child as TmplAstElement) ||
          (child instanceof TmplAstText && child.value.trim() === ''),
      );
    if (isEmptyAfterwards) {
      const from = element.startSourceSpan.end.offset;
      edits.push({
        offset: baseOffset + from,
        index: nextIndex(),
        length: endSpan.start.offset - from,
      });
    } else {
      for (const child of dateInputs) {
        const childStart = child.sourceSpan.start.offset;
        edits.push({
          offset: baseOffset + childStart,
          index: nextIndex(),
          length: child.sourceSpan.end.offset - childStart,
        });
      }
    }

    if (siblings.length > 0) {
      const separator = inline ? '' : `\n${indent}`;
      edits.push({
        offset: baseOffset + start,
        index: nextIndex(),
        length: 0,
        insertion: `${siblings.join(separator)}${separator}`,
        log: () =>
          logger.info(`  → Moved datepicker controls and inputs before it in '${filePath}'`),
      });
    }
  }, scope);
}

const importPaths: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/datepicker', newImport: '@sbb-esta/lyne-angular/datepicker' },
];

const comments: CommentMigration[] = DEPRECATED_DATEPICKER_ATTRIBUTES.map((attr) => ({
  selector: `sbb-datepicker[${attr}]`,
  message: `FIXME: the attribute \`${attr}\` does not exist anymore on \`sbb-datepicker\`.`,
})).concat({
  selector: 'input[sbbDateInput][inputBlurred]',
  message: 'FIXME: `inputBlurred` does not exist anymore on `sbb-date-input`.',
});

const selectors: SelectorMigration[] = [
  { selector: 'input[sbbDateInput]', replaceWith: 'sbb-date-input', transformToPairedTag: true },
];

const attributes: AttributeMigration[] = [
  { selector: 'sbb-date-input[dateChange]', attribute: 'dateChange', replaceWith: 'change' },
  { selector: 'sbb-date-input[dateInput]', attribute: 'dateInput', replaceWith: 'input' },
  { selector: 'sbb-date-input[sbbInput]', attribute: 'sbbInput' },
  { selector: 'sbb-date-input[sbbDateInput]', attribute: 'sbbDateInput' },
  { selector: 'sbb-datepicker', attribute: 'closed', replaceWith: 'close' },
  { selector: 'sbb-datepicker', attribute: 'opened', replaceWith: 'open' },
];

export const DATEPICKER_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  selectors,
  attributes,
  customRules: [(scope?: MigrationScope) => createDatepickerMigrationRule(scope)],
};
