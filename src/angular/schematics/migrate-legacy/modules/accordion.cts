import { TmplAstElement } from '@angular/compiler';

import type { MigrationScope } from '../../utils.cjs';
import type { CommentMigration, ImportRewriteOptions, ModuleMigrations } from '../common.cjs';
import { createTemplateMigrationRule } from '../template-migration.cjs';

const importPaths: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/accordion', newImport: '@sbb-esta/lyne-angular/accordion' },
];

const comments: CommentMigration[] = [
  {
    selector: 'sbb-accordion[hideToggle]',
    message: `FIXME: 'hideToggle' has no counterpart in lyne-angular.`,
  },
  {
    selector: 'sbb-expansion-panel[hideToggle]',
    message: "FIXME: 'hideToggle' has no counterpart in lyne-angular.",
  },
];

const PANEL = 'sbb-expansion-panel';
const HEADER = 'sbb-expansion-panel-header';
const CONTENT = 'sbb-expansion-panel-content';

/** Wraps everything following the header of an expansion panel into `<sbb-expansion-panel-content>`. */
export const wrapPanelContentMigration = (scope: MigrationScope) =>
  createTemplateMigrationRule((element, context) => {
    const end = element.endSourceSpan;
    if (element.name !== PANEL || !end || !context.content.startsWith('</', end.start.offset)) {
      return;
    }

    const elements = element.children.filter((child) => child instanceof TmplAstElement);
    // Already migrated.
    if (elements.some((child) => child.name === CONTENT)) {
      return;
    }

    const header = elements.findLast((child) => child.name === HEADER);
    const from = (header?.sourceSpan ?? element.startSourceSpan).end.offset;
    const inner = context.content.slice(from, end.start.offset);
    const trimmed = inner.trim();
    if (!trimmed) {
      return;
    }

    const start = context.baseOffset + from + inner.indexOf(trimmed);
    context.edits.push(
      { offset: start, index: context.nextIndex(), length: 0, insertion: `<${CONTENT}>` },
      {
        offset: start + trimmed.length,
        index: context.nextIndex(),
        length: 0,
        insertion: `</${CONTENT}>`,
        log: () =>
          context.logger.info(`  → Wrapped panel content in '${CONTENT}' in ${context.filePath}`),
      },
    );
  }, scope);

/**
 * Migrate the accordion module (including expansion-panel)
 *
 * Transformations:
 * 1. ✓ Rewrite import paths
 * 2. ✓ mark 'hideToggle' usages with a comment, because it has no counterpart in lyne-angular
 * 3. ✓ Wrap the content of `<sbb-expansion-panel>` into `<sbb-expansion-panel-content>`
 */
export const ACCORDION_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  customRules: [wrapPanelContentMigration],
};
