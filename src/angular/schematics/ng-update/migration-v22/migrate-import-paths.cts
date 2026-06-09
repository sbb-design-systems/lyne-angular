import { Migration, TargetVersion } from '@angular/cdk/schematics';
import * as ts from 'typescript';

/**
 * Map of old entry point import paths to their new counterparts.
 * Add entries here whenever a public entry point is renamed or consolidated.
 *
 * Example: '@sbb-esta/lyne-angular/button/accent-button' was merged into '@sbb-esta/lyne-angular/button'.
 */
const IMPORT_PATH_MIGRATIONS: Record<string, string> = {
  '@sbb-esta/lyne-angular/button/accent-button-link': '@sbb-esta/lyne-angular/button',
  '@sbb-esta/lyne-angular/button/accent-button-static': '@sbb-esta/lyne-angular/button',
  '@sbb-esta/lyne-angular/button/accent-button': '@sbb-esta/lyne-angular/button',
  '@sbb-esta/lyne-angular/button/button-link': '@sbb-esta/lyne-angular/button',
  '@sbb-esta/lyne-angular/button/button-static': '@sbb-esta/lyne-angular/button',
  '@sbb-esta/lyne-angular/button/button': '@sbb-esta/lyne-angular/button',
  '@sbb-esta/lyne-angular/button/mini-button-group': '@sbb-esta/lyne-angular/button',
  '@sbb-esta/lyne-angular/button/mini-button-link': '@sbb-esta/lyne-angular/button',
  '@sbb-esta/lyne-angular/button/mini-button': '@sbb-esta/lyne-angular/button',
  '@sbb-esta/lyne-angular/button/secondary-button-link': '@sbb-esta/lyne-angular/button',
  '@sbb-esta/lyne-angular/button/secondary-button-static': '@sbb-esta/lyne-angular/button',
  '@sbb-esta/lyne-angular/button/secondary-button': '@sbb-esta/lyne-angular/button',
  '@sbb-esta/lyne-angular/button/transparent-button-link': '@sbb-esta/lyne-angular/button',
  '@sbb-esta/lyne-angular/button/transparent-button-static': '@sbb-esta/lyne-angular/button',
  '@sbb-esta/lyne-angular/button/transparent-button': '@sbb-esta/lyne-angular/button',
  '@sbb-esta/lyne-angular/checkbox/checkbox-group': '@sbb-esta/lyne-angular/checkbox-group',
  '@sbb-esta/lyne-angular/checkbox/checkbox-panel': '@sbb-esta/lyne-angular/checkbox-panel',
  '@sbb-esta/lyne-angular/checkbox/checkbox': '@sbb-esta/lyne-angular/checkbox',
  '@sbb-esta/lyne-angular/container/container': '@sbb-esta/lyne-angular/container',
  '@sbb-esta/lyne-angular/container/sticky-bar': '@sbb-esta/lyne-angular/container',
  '@sbb-esta/core/overlay': '@sbb-esta/core',
  '@sbb-esta/lyne-angular/file-selector/file-selector': '@sbb-esta/lyne-angular/file-selector',
  '@sbb-esta/lyne-angular/file-selector/file-selector-dropzone':
    '@sbb-esta/lyne-angular/file-selector',
  '@sbb-esta/lyne-angular/link-list/link-list-anchor': '@sbb-esta/lyne-angular/link-list-anchor',
  '@sbb-esta/lyne-angular/link-list/link-list': '@sbb-esta/lyne-angular/link-list',
  '@sbb-esta/lyne-angular/link/block-link-button': '@sbb-esta/lyne-angular/link',
  '@sbb-esta/lyne-angular/link/block-link-static': '@sbb-esta/lyne-angular/link',
  '@sbb-esta/lyne-angular/link/block-link': '@sbb-esta/lyne-angular/link',
  '@sbb-esta/lyne-angular/link/link-button': '@sbb-esta/lyne-angular/link',
  '@sbb-esta/lyne-angular/link/link-static': '@sbb-esta/lyne-angular/link',
  '@sbb-esta/lyne-angular/link/link': '@sbb-esta/lyne-angular/link',
  '@sbb-esta/lyne-angular/paginator/compact-paginator': '@sbb-esta/lyne-angular/paginator',
  '@sbb-esta/lyne-angular/paginator/paginator': '@sbb-esta/lyne-angular/paginator',
  '@sbb-esta/lyne-angular/radio-button/radio-button-group':
    '@sbb-esta/lyne-angular/radio-button-group',
  '@sbb-esta/lyne-angular/radio-button/radio-button-panel':
    '@sbb-esta/lyne-angular/radio-button-panel',
  '@sbb-esta/lyne-angular/radio-button/radio-button': '@sbb-esta/lyne-angular/radio-button',
  '@sbb-esta/lyne-angular/teaser-product/teaser-product-static':
    '@sbb-esta/lyne-angular/teaser-product',
  '@sbb-esta/lyne-angular/teaser-product/teaser-product': '@sbb-esta/lyne-angular/teaser-product',
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
      const oldPath = specifier.text;
      const newPath = IMPORT_PATH_MIGRATIONS[oldPath];

      if (newPath) {
        this._replaceImportPath(specifier, oldPath, newPath);
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
