import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { SEARCH_MIGRATIONS } from './search.cjs';

describe('sbb-search', () => {
  const defaultMigration: Rule = () =>
    chain([createCommentMigrationRule(SEARCH_MIGRATIONS.comments)]);

  it('should comment sbb-search', async () => {
    expect(
      await MigrateLegacyTestUtils.migrateHtmlFile(
        '<sbb-search><input sbbInput /></sbb-search>',
        defaultMigration,
      ),
    ).toContain(`FIXME:`);
  });

  it('should comment the header search button', async () => {
    expect(
      await MigrateLegacyTestUtils.migrateHtmlFile(
        '<button sbbHeaderSearch></button>',
        defaultMigration,
      ),
    ).toContain(`FIXME:`);
  });

  it('should comment the module symbol', async () => {
    const source = await MigrateLegacyTestUtils.migrateTsFile(
      [
        "import { SbbSearchModule } from '@sbb-esta/angular/search';",
        '',
        'export const imports = [SbbSearchModule];',
      ].join('\n'),
      defaultMigration,
    );
    expect(source).toContain(`FIXME:`);
  });
});
