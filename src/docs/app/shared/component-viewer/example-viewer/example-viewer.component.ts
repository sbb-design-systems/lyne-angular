import { AsyncPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { Component, inject, Input, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import type { ExampleData} from '@sbb-esta/components-examples';
// import { loadExample } from '@sbb-esta/components-examples';
import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbTabsModule } from '@sbb-esta/lyne-angular/tabs';
import { SbbTooltipModule } from '@sbb-esta/lyne-angular/tooltip';
import type { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import type { ExampleData } from '../../example-data';
import { loadExample } from '../../example-module';
import { HtmlLoader } from '../../html-loader.service';
import { moduleParams } from '../../module-params';

interface ExampleCode {
  label: string;
  code: string;
}

@Component({
  selector: 'sbb-example-outlet',
  template: '',
})
class ExampleOutletComponent implements OnInit {
  @Input() exampleData!: ExampleData;

  private _viewContainerRef = inject(ViewContainerRef);

  async ngOnInit() {
    const example = await loadExample(this.exampleData?.id);
    // @ts-expect-error TODO: handle list of examples properly
    this._viewContainerRef.createComponent(example[this.exampleData.componentNames[0]], {
      // @ts-expect-error TODO: handle list of examples properly
      injector: example.injector,
    });
  }
}

export default ExampleOutletComponent;

@Component({
  selector: 'sbb-example-viewer',
  templateUrl: './example-viewer.component.html',
  styleUrls: ['./example-viewer.component.scss'],
  imports: [AsyncPipe, ExampleOutletComponent, SbbTooltipModule, SbbTabsModule, SbbSecondaryButton],
})
export class ExampleViewerComponent implements OnInit {
  @Input() exampleData!: ExampleData;
  exampleCodes!: Observable<ExampleCode[]>;
  showSource: boolean = false;
  private _defaultExtensionsOrder = ['html', 'ts', 'css'];

  private _htmlLoader = inject(HtmlLoader);
  private _route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.exampleCodes = combineLatest(
      this.exampleData.exampleFiles.map((exampleFile) =>
        this._createLoader(
          this._convertToExampleName(this.exampleData.selectorName),
          exampleFile,
        ).pipe(
          map((code) => ({
            label: this._convertToFileLabel(exampleFile),
            code,
          })),
        ),
      ),
    ).pipe(
      map((exampleCodes: ExampleCode[]) =>
        exampleCodes.sort(
          (a, b) =>
            this._defaultExtensionsOrder.indexOf(a.label) -
            this._defaultExtensionsOrder.indexOf(b.label),
        ),
      ),
    );
  }

  stackBlitzEnabled() {
    return moduleParams(this._route).pipe(
      map((params) => ['angular', 'journey-maps'].includes(params.packageName)),
    );
  }

  private _createLoader(exampleName: string, exampleFile: string) {
    const exampleHtmlFile = this._convertToHtmlFilePath(exampleFile);
    return moduleParams(this._route).pipe(
      switchMap((params) =>
        this._htmlLoader.withParams(params).fromExamples(exampleName, exampleHtmlFile).load(),
      ),
    );
  }

  // Returns the path to the html file for a given example file.
  private _convertToHtmlFilePath(filePath: string): string {
    return filePath.replace(/(.*)[.](html|ts|css)/, '$1-$2.html');
  }

  // Get the example name from the selector name
  private _convertToExampleName(selectorName: string): string {
    return selectorName.replace('sbb-', '').replace('-example', '');
  }

  // Get the label for a given html example file
  private _convertToFileLabel(filePath: string): string {
    const showExtensionOnly =
      this._removeFileExtension(this.exampleData.indexFilename) ===
      this._removeFileExtension(filePath);
    return showExtensionOnly ? filePath.split('.').pop()!.toUpperCase() : filePath;
  }

  // Remove the extension from a given file
  private _removeFileExtension(filePath: string): string {
    return filePath.replace(/\.[^/.]+$/, '');
  }
}
