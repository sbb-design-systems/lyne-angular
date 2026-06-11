import { Migration, TargetVersion } from '@angular/cdk/schematics';
import * as ts from 'typescript';

function importMigration(lib: string): Record<string, string> {
  return {
    [`@sbb-esta/${lib}/button/accent-button-link`]: `@sbb-esta/${lib}/button`,
    [`@sbb-esta/${lib}/button/accent-button-static`]: `@sbb-esta/${lib}/button`,
    [`@sbb-esta/${lib}/button/accent-button`]: `@sbb-esta/${lib}/button`,
    [`@sbb-esta/${lib}/button/button-link`]: `@sbb-esta/${lib}/button`,
    [`@sbb-esta/${lib}/button/button-static`]: `@sbb-esta/${lib}/button`,
    [`@sbb-esta/${lib}/button/button`]: `@sbb-esta/${lib}/button`,
    [`@sbb-esta/${lib}/button/mini-button-group`]: `@sbb-esta/${lib}/button`,
    [`@sbb-esta/${lib}/button/mini-button-link`]: `@sbb-esta/${lib}/button`,
    [`@sbb-esta/${lib}/button/mini-button`]: `@sbb-esta/${lib}/button`,
    [`@sbb-esta/${lib}/button/secondary-button-link`]: `@sbb-esta/${lib}/button`,
    [`@sbb-esta/${lib}/button/secondary-button-static`]: `@sbb-esta/${lib}/button`,
    [`@sbb-esta/${lib}/button/secondary-button`]: `@sbb-esta/${lib}/button`,
    [`@sbb-esta/${lib}/button/transparent-button-link`]: `@sbb-esta/${lib}/button`,
    [`@sbb-esta/${lib}/button/transparent-button-static`]: `@sbb-esta/${lib}/button`,
    [`@sbb-esta/${lib}/button/transparent-button`]: `@sbb-esta/${lib}/button`,
    [`@sbb-esta/${lib}/checkbox/checkbox-group`]: `@sbb-esta/${lib}/checkbox-group`,
    [`@sbb-esta/${lib}/checkbox/checkbox-panel`]: `@sbb-esta/${lib}/checkbox-panel`,
    [`@sbb-esta/${lib}/checkbox/checkbox`]: `@sbb-esta/${lib}/checkbox`,
    [`@sbb-esta/${lib}/container/container`]: `@sbb-esta/${lib}/container`,
    [`@sbb-esta/${lib}/container/sticky-bar`]: `@sbb-esta/${lib}/container`,
    [`@sbb-esta/${lib}/core/overlay`]: `@sbb-esta/${lib}/core`,
    [`@sbb-esta/${lib}/file-selector/file-selector`]: `@sbb-esta/${lib}/file-selector`,
    [`@sbb-esta/${lib}/file-selector/file-selector-dropzone`]: `@sbb-esta/${lib}/file-selector`,
    [`@sbb-esta/${lib}/link-list/link-list-anchor`]: `@sbb-esta/${lib}/link-list-anchor`,
    [`@sbb-esta/${lib}/link-list/link-list`]: `@sbb-esta/${lib}/link-list`,
    [`@sbb-esta/${lib}/link/block-link-button`]: `@sbb-esta/${lib}/link`,
    [`@sbb-esta/${lib}/link/block-link-static`]: `@sbb-esta/${lib}/link`,
    [`@sbb-esta/${lib}/link/block-link`]: `@sbb-esta/${lib}/link`,
    [`@sbb-esta/${lib}/link/link-button`]: `@sbb-esta/${lib}/link`,
    [`@sbb-esta/${lib}/link/link-static`]: `@sbb-esta/${lib}/link`,
    [`@sbb-esta/${lib}/link/link`]: `@sbb-esta/${lib}/link`,
    [`@sbb-esta/${lib}/paginator/compact-paginator`]: `@sbb-esta/${lib}/paginator`,
    [`@sbb-esta/${lib}/paginator/paginator`]: `@sbb-esta/${lib}/paginator`,
    [`@sbb-esta/${lib}/radio-button/radio-button-group`]: `@sbb-esta/${lib}/radio-button-group`,
    [`@sbb-esta/${lib}/radio-button/radio-button-panel`]: `@sbb-esta/${lib}/radio-button-panel`,
    [`@sbb-esta/${lib}/radio-button/radio-button`]: `@sbb-esta/${lib}/radio-button`,
    [`@sbb-esta/${lib}/teaser-product/teaser-product-static`]: `@sbb-esta/${lib}/teaser-product`,
    [`@sbb-esta/${lib}/teaser-product/teaser-product`]: `@sbb-esta/${lib}/teaser-product`,
  };
}

/**
 * Map of old entry point import paths to their new counterparts.
 * Add entries here whenever a public entry point is renamed or consolidated.
 *
 * Example: '@sbb-esta/lyne-angular/button/accent-button' was merged into '@sbb-esta/lyne-angular/button'.
 */
const IMPORT_PATH_MIGRATIONS: Record<string, string> = {
  ...importMigration('lyne-elements'),
  ...importMigration('lyne-angular'),
};

export class MigrateImportPaths extends Migration<null> {
  enabled = this.targetVersion === TargetVersion.V22;

  override visitNode(node: ts.Node): void {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      const specifier = node.moduleSpecifier as ts.StringLiteral;
      const ext = specifier.text.endsWith('.js') ? '.js' : '';
      const oldPath = specifier.text.replace(ext, '');
      const newPath = IMPORT_PATH_MIGRATIONS[oldPath];
      if (newPath) {
        this._replaceImportPath(specifier, oldPath, `${newPath}${ext}`);
      }
    }
  }

  private _replaceImportPath(node: ts.Node, oldPath: string, newPath: string): void {
    const sourceFile = node.getSourceFile();
    const filePath = this.fileSystem.resolve(sourceFile.fileName);
    const sourceText = sourceFile.text;
    const pos = node.getStart(node.getSourceFile());
    const end = node.getEnd();
    const recorder = this.fileSystem.edit(filePath);

    // Preserve the original quote style (' or ").
    const quote = sourceText[pos];
    recorder.remove(pos, end - pos);
    recorder.insertLeft(pos, `${quote}${newPath}${quote}`);

    this.logger.info(`  → Fix import '${oldPath}' → '${newPath}' in ${filePath}`);
  }
}
