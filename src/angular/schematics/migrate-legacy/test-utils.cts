import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { HostTree, type Rule, type Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { firstValueFrom } from 'rxjs';

// Unique per worker, so parallel spec files never write the same file.
const collectionPath = path.join(
  fs.mkdtempSync(path.join(os.tmpdir(), 'lyne-angular-migration-')),
  'collection.json',
);
fs.writeFileSync(collectionPath, JSON.stringify({ schematics: {} }));

export const runner = new SchematicTestRunner('test', collectionPath);

export class MigrateLegacyTestUtils {
  static migrateHtmlFile(content: string, rule: Rule): Promise<string> {
    return this._migrateFile('/src/app/app.component.html', content, rule);
  }

  static migrateTsFile(content: string, rule: Rule): Promise<string> {
    return this._migrateFile('/src/app/app.component.ts', content, rule);
  }

  static async migrateFiles(files: Record<string, string>, rule: Rule): Promise<Tree> {
    const tree = new UnitTestTree(new HostTree());
    for (const [filePath, content] of Object.entries(files)) {
      tree.create(filePath, content);
    }
    return firstValueFrom(runner.callRule(rule, tree));
  }

  private static async _migrateFile(
    filePath: string,
    content: string,
    rule: Rule,
  ): Promise<string> {
    const tree = new UnitTestTree(new HostTree());
    tree.create(filePath, content);
    const migratedTree = await firstValueFrom(runner.callRule(rule, tree));
    return migratedTree.read(filePath)!.toString('utf-8');
  }
}
