import type { MigrationScope } from '../../utils.cjs';
import type {
  CommentMigration,
  ImportRewriteOptions,
  ModuleMigrations,
  SelectorMigration,
  TypeMigration,
} from '../common.cjs';
import { createTemplateMigrationRule, hasAttribute } from '../template-migration.cjs';

const importPaths: ImportRewriteOptions[] = [
  {
    oldImport: '@sbb-esta/angular/radio-button',
    newImport: '@sbb-esta/lyne-angular/radio-button',
  },
];

const comments: CommentMigration[] = [
  {
    selector: 'sbb-radio-group[selected]',
    message: "FIXME: 'selected' does not exist anymore. Use 'value' instead.",
  },
];

const types: TypeMigration[] = [
  { from: 'SbbRadioGroup', to: 'SbbRadioButtonGroup' },
  { from: 'SbbRadioChange', to: 'Event', skipImports: true },
];

const selectors: SelectorMigration[] = [
  { selector: 'sbb-radio-group', replaceWith: 'sbb-radio-button-group' },
];

const ORIENTATION_CLASSES: Record<string, 'horizontal' | 'vertical'> = {
  'sbb-radio-group-vertical': 'vertical',
  'sbb-radio-group-horizontal': 'horizontal',
  'sbb-checkbox-group-vertical': 'vertical',
  'sbb-checkbox-group-horizontal': 'horizontal',
};

/** Replaces the static layout classes of a radio group with the `orientation` attribute. */
export const radioGroupOrientationMigration = (scope?: MigrationScope) =>
  createTemplateMigrationRule((element, context) => {
    if (element.name !== 'sbb-radio-button-group' || hasAttribute(element, 'orientation')) {
      return;
    }

    const classAttribute = element.attributes.find((a) => a.name === 'class');
    const classes = classAttribute?.value.split(/\s+/).filter(Boolean) ?? [];
    const layout = classes.find((c) => c in ORIENTATION_CLASSES);
    if (!classAttribute || !layout) {
      return;
    }

    const orientation = ORIENTATION_CLASSES[layout];
    const rest = classes.filter((c) => !(c in ORIENTATION_CLASSES));
    const { start, end } = classAttribute.sourceSpan;
    context.edits.push({
      offset: context.baseOffset + start.offset,
      index: context.nextIndex(),
      length: end.offset - start.offset,
      insertion: `orientation="${orientation}"${rest.length ? ` class="${rest.join(' ')}"` : ''}`,
      log: () =>
        context.logger.info(`  → Replaced '${layout}' with orientation in '${context.filePath}'`),
    });
  }, scope);

/**
 * Migrate the radio-button module
 *
 * Transformations:
 * 1. ✓ Rewrite import paths
 * 2. ✓ `sbb-radio-group` => `sbb-radio-button-group`
 * 3. ✓ Mark removed inputs
 * 4. ✓ Layout classes of the group => `orientation` attribute
 */
export const RADIO_BUTTON_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  types,
  selectors,
  customRules: [radioGroupOrientationMigration],
};
