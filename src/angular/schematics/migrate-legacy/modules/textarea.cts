import type { Rule } from '@angular-devkit/schematics';

import { getIndent, getLineStart } from '../../comment-utils.cjs';
import type { MigrationScope } from '../../utils.cjs';
import type { CommentMigration, ModuleMigrations, Span } from '../common.cjs';
import { createTemplateMigrationRule } from '../template-migration.cjs';

const TEXTAREA = 'sbb-textarea';
const COUNTER = 'sbb-form-field-text-counter';
const FORM_FIELD = 'sbb-form-field';

/**
 * Creates a rule which migrates `<sbb-textarea>`:
 * - without `maxlength`, it is replaced by a native `<textarea>`:
 * - with a static or bound `maxlength` inside an `<sbb-form-field>`, it is replaced by a native `<textarea>` and a character counter is added right after it:
 * - with `maxlength` outside an `<sbb-form-field>`, the element is left as is and a comment is added.
 */
export function createTextareaMigrationRule(scope?: MigrationScope): Rule {
  // Elements are visited parents first, so the form fields seen so far include all ancestors of an element.
  let formFields: { content: string; spans: Span[] } = { content: '', spans: [] };

  return createTemplateMigrationRule((element, context) => {
    const { content, baseOffset, inline, edits, nextIndex, filePath, logger } = context;

    if (formFields.content !== content) {
      formFields = { content, spans: [] };
    }
    const span = { start: element.sourceSpan.start.offset, end: element.sourceSpan.end.offset };
    if (element.name === FORM_FIELD) {
      formFields.spans.push(span);
    }
    if (element.name !== TEXTAREA) {
      return;
    }

    const startTag = element.startSourceSpan;
    const endTag = element.endSourceSpan;
    if (!endTag) {
      return;
    }

    const edit = (offset: number, length: number, insertion: string, log?: () => void) =>
      edits.push({ offset: baseOffset + offset, index: nextIndex(), length, insertion, log });
    const indent = getIndent(content, getLineStart(content, startTag.start.offset));
    const withMaxlength = [...element.attributes, ...element.inputs].some(
      ({ name }) => name.toLowerCase() === 'maxlength',
    );

    edit(startTag.start.offset + 1, TEXTAREA.length, 'textarea', () =>
      logger.info(`  → Replaced <${TEXTAREA}> with <textarea> in ${filePath}`),
    );
    edit(endTag.start.offset + '</'.length, TEXTAREA.length, 'textarea');

    if (withMaxlength && formFields.spans.some((f) => f.start <= span.start && span.end <= f.end)) {
      const counter = `<${COUNTER}></${COUNTER}>`;
      edit(endTag.end.offset, 0, inline ? counter : `\n${indent}${counter}`, () =>
        logger.info(`  → Added <${COUNTER}> after <textarea> in ${filePath}`),
      );
    }
  }, scope);
}

const comments: CommentMigration[] = [
  {
    symbol: 'SbbTextareaModule',
    message:
      'FIXME: this component has no direct counterpart in lyne-angular; use sbb-form-field with a textarea.',
  },
];

/**
 * Migrate the textarea component from `@sbb-esta/angular` to `@sbb-esta/lyne-angular`.
 */
export const TEXTAREA_MIGRATIONS: Partial<ModuleMigrations> = {
  comments,
  customRules: [(scope: MigrationScope) => createTextareaMigrationRule(scope)],
};
