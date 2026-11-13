import type { MigrationScope } from '../../utils.cjs';
import type { ImportRewriteOptions, ModuleMigrations } from '../common.cjs';
import { createTemplateMigrationRule } from '../template-migration.cjs';

const importPaths: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/table', newImport: '@sbb-esta/lyne-angular/table' },
];

const STRIPED = 'sbb-table--striped';

/** Adds the `sbb-table--striped` class to `<sbb-table>` and `<table sbb-table>`. */
export const addStripedClassMigration = (scope?: MigrationScope) =>
  createTemplateMigrationRule((element, context) => {
    const isTable =
      element.name === 'sbb-table' ||
      (element.name === 'table' && element.attributes.some((a) => a.name === 'sbb-table'));
    if (!isTable) {
      return;
    }

    const log = () => context.logger.info(`  → Added '${STRIPED}' class in ${context.filePath}`);
    const classAttr = element.attributes.find((a) => a.name === 'class');

    if (!classAttr) {
      context.edits.push({
        offset: context.baseOffset + element.startSourceSpan.start.offset + 1 + element.name.length,
        index: context.nextIndex(),
        length: 0,
        insertion: ` class="${STRIPED}"`,
        log,
      });
      return;
    }

    if (classAttr.value.split(/\s+/).includes(STRIPED)) {
      return;
    }

    const value = classAttr.valueSpan;
    context.edits.push(
      value && classAttr.value.trim()
        ? {
            offset: context.baseOffset + value.end.offset,
            index: context.nextIndex(),
            length: 0,
            insertion: ` ${STRIPED}`,
            log,
          }
        : {
            offset: context.baseOffset + classAttr.sourceSpan.start.offset,
            index: context.nextIndex(),
            length: classAttr.sourceSpan.end.offset - classAttr.sourceSpan.start.offset,
            insertion: `class="${STRIPED}"`,
            log,
          },
    );
  }, scope);

/**
 * Migrate the table module
 *
 * Transformations:
 * 1. ✓ Rewrite import paths
 * 2. ✓ Add the `sbb-table--striped` class to `<sbb-table>` and `<table sbb-table>`
 */
export const TABLE_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  customRules: [addStripedClassMigration],
};
