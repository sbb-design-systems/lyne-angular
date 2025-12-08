import { HttpClient } from '@angular/common/http';
import { inject, NgZone, Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import stackblitz from '@stackblitz/sdk';
import type { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { shareReplay, take } from 'rxjs/operators';

import type { ExampleData } from '../../example-data';

/**
 * Path that refers to the docs-content from the "@sbb-esta/components-examples" package.
 */
const DOCS_CONTENT_PATH = 'docs-content/examples';

const TEMPLATE_PATH = 'assets/stackblitz/';

/**
 * List of boilerplate files for an example StackBlitz.
 * This currently matches files needed for a basic Angular CLI project.
 */
export const TEMPLATE_FILES = [
  '.gitignore',
  '.stackblitzrc',
  'angular.json',
  'package.json',
  'yarn.lock',
  'tsconfig.app.json',
  'tsconfig.json',
  'src/favicon.ico',
  'src/index.html',
  'src/main.ts',
  'src/styles.css',
  'src/environments/environment.prod.ts',
  'src/environments/environment.ts',
];

const PROJECT_TEMPLATE = 'node';

/**
 * Type describing an in-memory file dictionary, representing a
 * directory and its contents.
 */
type FileDictionary = Record<string, string>;

/**
 * StackBlitz writer, write example files to StackBlitz.
 */
@Injectable({ providedIn: 'root' })
export class StackBlitzWriter {
  private _fileCache = new Map<string, Observable<string>>();
  private _http: HttpClient = inject(HttpClient);
  private _ngZone: NgZone = inject(NgZone);
  private _meta: Meta = inject(Meta);
  private _version = this._getPatchedTagVersion('name="sbb-lyne-angular-version"');
  private _lyneVersion = this._getPatchedTagVersion('name="sbb-lyne-components-version"');
  private _tokenVersion = this._getPatchedTagVersion('name="sbb-lyne-token-version"');

  /** Opens a StackBlitz for the specified example. */
  createStackBlitzForExample(data: ExampleData): Promise<(isSbbLean: boolean) => void> {
    // Run outside the zone since the creation doesn't interact with Angular
    // and the file requests can cause excessive change detections.
    return this._ngZone.runOutsideAngular(async () => {
      const files = await this._buildInMemoryFileDictionary(data);
      const exampleMainFile = `src/app/${data.indexFilename}`;

      return (isSbbLean: boolean) => {
        files['src/index.html'] = files['src/index.html'].replace(
          /\${sbbLean}/g,
          isSbbLean ? ' class="sbb-lean"' : '',
        );

        this._openStackBlitz({
          files,
          title: `Sbb Angular Library - ${data.description}`,
          // FIXME the definitive app endpoint must be updated once deployed
          description: `${data.description}\n\nAuto-generated from: https://lyne-angular.app.sbb.ch`,
          openFile: exampleMainFile,
        });
      };
    });
  }

  /** Opens a new WebContainer-based StackBlitz for the given files. */
  private _openStackBlitz({
    title,
    description,
    openFile,
    files,
  }: {
    title: string;
    description: string;
    openFile: string;
    files: FileDictionary;
  }): void {
    stackblitz.openProject(
      {
        title,
        files,
        description,
        template: PROJECT_TEMPLATE,
      },
      { openFile },
    );
  }

  /**
   * Builds an in-memory file dictionary representing an CLI project serving
   * the example. The dictionary can then be passed to StackBlitz as project files.
   */
  private async _buildInMemoryFileDictionary(data: ExampleData): Promise<FileDictionary> {
    const result: FileDictionary = {};
    const tasks: Promise<unknown>[] = [];
    const exampleBaseContentPath = `${DOCS_CONTENT_PATH}/${data.importPath}/${data.id}/`;

    for (const relativeFilePath of TEMPLATE_FILES) {
      tasks.push(
        this._loadFile(TEMPLATE_PATH + relativeFilePath)
          // Replace example placeholders in the template files.
          .then((content) => this._replaceExamplePlaceholders(data, relativeFilePath, content))
          .then((content) => (result[relativeFilePath] = content)),
      );
    }

    for (const relativeFilePath of data.exampleFiles) {
      tasks.push(
        this._loadFile(exampleBaseContentPath + relativeFilePath)
          // Insert a copyright footer for all example files inserted into the project.
          .then((content) => (result[`src/app/${relativeFilePath}`] = content)),
      );
    }

    // Wait for the file dictionary to be populated. All file requests are
    // triggered concurrently to speed up the example StackBlitz generation.
    await Promise.all(tasks);

    return result;
  }

  /**
   * Loads the specified file and returns a promise resolving to its contents.
   */
  private _loadFile(fileUrl: string): Promise<string> {
    let stream = this._fileCache.get(fileUrl);

    if (!stream) {
      stream = this._http.get(fileUrl, { responseType: 'text' }).pipe(shareReplay(1));
      this._fileCache.set(fileUrl, stream);
    }

    // The `take(1)` is necessary, because the Promise from `firstValueFrom` resolves on the first emitted value
    return firstValueFrom(stream.pipe(take(1)));
  }

  /**
   * The StackBlitz template assets contain placeholder names for the examples:
   * "<sbb-angular-docs-example>" and "SbbAngularDocsExample".
   * This will replace those placeholders with the names from the example metadata,
   * e.g. "<basic-button-example>" and "BasicButtonExample"
   */
  private _replaceExamplePlaceholders(
    data: ExampleData,
    fileName: string,
    fileContent: string,
  ): string {
    // Replaces the version placeholder in the `index.html` and `package.json` file.
    // Technically we invalidate the `package-lock.json` file for the StackBlitz boilerplate
    // by dynamically changing the version in the `package.json`, but the Turbo package manager
    // seems to be able to partially re-use the lock file to speed up the module tree computation,
    // so providing a lock file is still reasonable while modifying the `package.json`.
    if (fileName === 'src/index.html' || fileName === 'package.json') {
      fileContent = fileContent.replace(/\{\{angular-version}}/g, this._version);
      fileContent = fileContent.replace(/\{\{components-version}}/g, this._lyneVersion);
      fileContent = fileContent.replace(/\{\{token-version}}/g, this._tokenVersion);
    }

    if (fileName === 'src/index.html') {
      // Replace the component selector in `index,html`.
      // For example, <sbb-angular-docs-example></sbb-angular-docs-example> will be replaced as
      // <button-demo></button-demo>
      fileContent = fileContent
        .replace(/sbb-angular-docs-example/g, data.selectorName)
        .replace(/\${title}/g, data.description);
    } else if (fileName === 'src/main.ts') {
      fileContent = fileContent.replaceAll('SbbAngularDocsExample', data.componentNames[0]);

      const dotIndex = data.indexFilename.lastIndexOf('.');
      const importFileName = data.indexFilename.slice(0, dotIndex === -1 ? undefined : dotIndex);
      fileContent = fileContent.replace(/sbb-angular-docs-example/g, importFileName);
    }
    return fileContent;
  }

  /**
   * In local environment, the postinstall script which overrides the versions in the index.html is not run,
   * so versions value are still placeholders; since it breaks the stackblitz install, 'latest' is set.
   * @param tag
   * @private
   */
  private _getPatchedTagVersion(tag: string): string {
    const tagVersion = this._meta.getTag(tag)!.content;
    if (tagVersion.startsWith('0.0.0')) {
      return 'latest';
    }
    return tagVersion;
  }
}
