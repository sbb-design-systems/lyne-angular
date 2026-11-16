import { TmplAstText } from '@angular/compiler';

import type { MigrationScope } from '../../utils.cjs';
import type { AttributeMigration, ImportRewriteOptions, ModuleMigrations } from '../common.cjs';
import { createTemplateMigrationRule, queueAttributeRemoval } from '../template-migration.cjs';

const importPaths: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/status', newImport: '@sbb-esta/lyne-angular/status' },
];

const attributes: AttributeMigration[] = [
  {
    selector: 'sbb-status',
    attribute: 'type',
    attributeValue: 'valid',
    replaceWith: 'type="success"',
    fullyReplace: true,
  },
  {
    selector: 'sbb-status',
    attribute: 'type',
    attributeValue: 'invalid',
    replaceWith: 'type="error"',
    fullyReplace: true,
  },
];

const STATUS = 'sbb-status';

/** Moves the `message` attribute of `<sbb-status>` into its content. */
export const statusMessageMigration = (scope?: MigrationScope) =>
  createTemplateMigrationRule((element, context) => {
    if (element.name !== STATUS) {
      return;
    }

    const message =
      element.attributes.find((a) => a.name === 'message') ??
      element.inputs.find((i) => i.name === 'message');
    if (!message?.valueSpan) {
      return;
    }

    const source = context.content.slice(
      message.valueSpan.start.offset,
      message.valueSpan.end.offset,
    );
    const text = element.inputs.includes(message as never) ? `{{ ${source} }}` : source;
    const log = () =>
      context.logger.info(
        `  → Converted 'sbb-status[message]' into content in ${context.filePath}`,
      );

    queueAttributeRemoval(
      context.content,
      context.baseOffset,
      message.sourceSpan.start.offset,
      message.sourceSpan.end.offset,
      context.edits,
      context.nextIndex,
    );

    const end = element.startSourceSpan.end.offset;
    if (element.isSelfClosing) {
      let from = end - 2;
      while (/\s/.test(context.content[from - 1])) {
        from--;
      }
      // Whitespace directly after the removed attribute is already consumed by its removal.
      from = Math.max(from, message.sourceSpan.end.offset);
      context.edits.push({
        offset: context.baseOffset + from,
        index: context.nextIndex(),
        length: end - from,
        insertion: `>${text}</${STATUS}>`,
        log,
      });
    } else {
      context.edits.push({
        offset: context.baseOffset + end,
        index: context.nextIndex(),
        length: 0,
        insertion: text,
        log,
      });
    }
  }, scope);

/**
 * Migrate the status module
 *
 * Transformations:
 * 1. ✓ Rewrite import paths
 * 2. ✓ Rename the type values `valid` → `success` and `invalid` → `error`
 * 3. ✓ Move `message` into the content
 */
export const STATUS_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  attributes,
  customRules: [statusMessageMigration],
};
