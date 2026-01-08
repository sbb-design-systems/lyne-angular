import { AsyncPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { Component, inject, Input, ViewContainerRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import type { SafeHtml } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbTabsModule } from '@sbb-esta/lyne-angular/tabs';
import { SbbTooltipModule } from '@sbb-esta/lyne-angular/tooltip';
import { marked } from 'marked';
import type { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import type { ExampleData } from '../../example-data';
import { loadExample } from '../../example-module';
import { HtmlLoader } from '../../html-loader.service';
import { moduleParams } from '../../module-params';
import { StackBlitzButton } from '../stack-blitz/stack-blitz-button';

interface ExampleCode {
  label: string;
  code: SafeHtml;
}

@Component({
  selector: 'sbb-example-outlet',
  template: '',
})
export class ExampleOutletComponent implements OnInit {
  #viewContainerRef = inject(ViewContainerRef);

  @Input() exampleData!: ExampleData;

  ngOnInit() {
    loadExample(this.exampleData.id).then((example) => {
      if (example) {
        this.#viewContainerRef.createComponent(example[this.exampleData.name]);
      }
    });
  }
}

@Component({
  selector: 'sbb-example-viewer',
  templateUrl: './example-viewer.component.html',
  styleUrls: ['./example-viewer.component.scss'],
  imports: [
    AsyncPipe,
    ExampleOutletComponent,
    SbbTabsModule,
    SbbTooltipModule,
    SbbSecondaryButton,
    StackBlitzButton,
  ],
})
export class ExampleViewerComponent implements OnInit {
  @Input() exampleData!: ExampleData;

  #htmlLoader = inject(HtmlLoader);
  #route = inject(ActivatedRoute);
  #domSanitizer = inject(DomSanitizer);
  #defaultExtensionsOrder = ['html', 'ts', 'css', 'scss'];

  stackBlitzEnabled = toSignal(
    moduleParams(this.#route).pipe(map((params) => params.packageName === 'angular')),
    { initialValue: false },
  );
  exampleCodes!: Observable<ExampleCode[]>;
  showSource: boolean = false;

  ngOnInit(): void {
    this.exampleCodes = combineLatest(
      this.exampleData.exampleFiles.map((exampleFile) =>
        this._createLoader(exampleFile).pipe(
          map((code) => ({
            label: this._getFileExtension(exampleFile),
            code,
          })),
        ),
      ),
    ).pipe(
      map((exampleCodes: ExampleCode[]) =>
        exampleCodes.sort(
          (a, b) =>
            this.#defaultExtensionsOrder.indexOf(a.label) -
            this.#defaultExtensionsOrder.indexOf(b.label),
        ),
      ),
    );
  }

  /** Load, convert and highlight the example file */
  private _createLoader(exampleFile: string) {
    return moduleParams(this.#route).pipe(
      switchMap((params) =>
        this.#htmlLoader.withParams(params).fromExamples(this.exampleData.id, exampleFile).load(),
      ),
      switchMap((code) =>
        marked.parse(`\`\`\`${this._getFileExtension(exampleFile)} \n${code}\n\`\`\``),
      ),
      map((code) => this.#domSanitizer.bypassSecurityTrustHtml(code)),
    );
  }

  /** Extract the file extension from the example file */
  private _getFileExtension(filePath: string): string {
    return filePath.split('.').pop()!.toUpperCase();
  }
}
