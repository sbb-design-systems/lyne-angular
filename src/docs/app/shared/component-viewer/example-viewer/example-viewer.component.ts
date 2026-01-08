import type { OnInit } from '@angular/core';
import { Component, computed, inject, input, ViewContainerRef } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import type { SafeHtml } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbTabsModule } from '@sbb-esta/lyne-angular/tabs';
import { SbbTooltipModule } from '@sbb-esta/lyne-angular/tooltip';
import { marked } from 'marked';
import { combineLatest, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import type { ExampleData } from '../../example-data';
import { loadExample } from '../../example-module';
import { HtmlLoader } from '../../html-loader.service';
import type { ModuleParams } from '../../module-params';
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
  exampleData = input.required<ExampleData>();

  ngOnInit() {
    if (this.exampleData()) {
      loadExample(this.exampleData().id).then((example) => {
        if (example) {
          this.#viewContainerRef.createComponent(example[this.exampleData().name]);
        }
      });
    }
  }
}

@Component({
  selector: 'sbb-example-viewer',
  templateUrl: './example-viewer.component.html',
  styleUrls: ['./example-viewer.component.scss'],
  imports: [
    ExampleOutletComponent,
    SbbTabsModule,
    SbbTooltipModule,
    SbbSecondaryButton,
    StackBlitzButton,
  ],
})
export class ExampleViewerComponent {
  #htmlLoader = inject(HtmlLoader);
  #route = inject(ActivatedRoute);
  #domSanitizer = inject(DomSanitizer);
  #defaultExtensionsOrder = ['html', 'ts', 'css', 'scss'];
  #routeParams = toSignal(moduleParams(this.#route));

  showSource: boolean = false;
  stackBlitzEnabled = computed(() => this.#routeParams()?.packageName === 'angular');
  exampleData = input.required<ExampleData>();
  exampleCodes = toSignal(
    toObservable(this.exampleData).pipe(
      switchMap((data) => {
        const params = this.#routeParams();
        if (!params) return [];

        return combineLatest(
          data.exampleFiles.map((file) => this._createLoader(file, data.id, params)),
        );
      }),
      map((exampleCodes: ExampleCode[]) =>
        exampleCodes.sort(
          (a, b) =>
            this.#defaultExtensionsOrder.indexOf(a.label) -
            this.#defaultExtensionsOrder.indexOf(b.label),
        ),
      ),
    ),
    { initialValue: [] as ExampleCode[] },
  );

  private _createLoader(exampleFile: string, id: string, params: ModuleParams) {
    const extension = this._getFileExtension(exampleFile);

    return this.#htmlLoader
      .withParams(params)
      .fromExamples(id, exampleFile)
      .load()
      .pipe(
        switchMap((code) =>
          from(marked.parse(`\`\`\`${extension.toLowerCase()} \n${code}\n\`\`\``)),
        ),
        map((html) => ({
          label: extension,
          code: this.#domSanitizer.bypassSecurityTrustHtml(html),
        })),
      );
  }

  /** Extract the file extension from the example file */
  private _getFileExtension(filePath: string): string {
    return filePath.split('.').pop()!.toUpperCase();
  }
}
