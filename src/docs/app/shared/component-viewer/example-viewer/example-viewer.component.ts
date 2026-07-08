import { Location } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import type { SafeHtml } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbNotificationModule } from '@sbb-esta/lyne-angular/notification';
import { SbbTabsModule } from '@sbb-esta/lyne-angular/tabs';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import { SbbToggleCheckModule } from '@sbb-esta/lyne-angular/toggle-check';
import { SbbTooltipModule } from '@sbb-esta/lyne-angular/tooltip';
import { marked } from 'marked';
import { combineLatest, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import type { ExampleData } from '../../example-data';
import { HtmlLoader } from '../../html-loader.service';
import type { ModuleParams } from '../../module-params';
import { moduleParams } from '../../module-params';
import { ExampleOutletComponent } from '../example-outlet/example-outlet.component';
import { StackBlitzButton } from '../stack-blitz/stack-blitz-button';

interface ExampleCode {
  label: string;
  code: SafeHtml;
}

@Component({
  selector: 'sbb-example-viewer',
  templateUrl: './example-viewer.component.html',
  styleUrls: ['./example-viewer.component.scss'],
  imports: [
    ExampleOutletComponent,
    RouterLink,
    SbbButtonModule,
    SbbLinkModule,
    SbbTabsModule,
    SbbTitleModule,
    SbbToggleCheckModule,
    SbbTooltipModule,
    SbbNotificationModule,
    StackBlitzButton,
  ],
})
export class ExampleViewerComponent {
  readonly #htmlLoader = inject(HtmlLoader);
  readonly #route = inject(ActivatedRoute);
  readonly #domSanitizer = inject(DomSanitizer);
  readonly #defaultExtensionsOrder = ['html', 'ts', 'css', 'scss'];
  protected readonly moduleParams = toSignal(moduleParams(this.#route));
  protected readonly currentPath = inject(Location).path();

  exampleData = input.required<ExampleData>();
  protected showSource = signal(false);
  protected stackBlitzEnabled = computed(
    () =>
      this.moduleParams()?.packageName === 'angular' ||
      this.moduleParams()?.packageName === 'angular-experimental',
  );
  protected exampleCodes = toSignal(
    toObservable(this.exampleData).pipe(
      switchMap((data) => {
        const params = this.moduleParams();

        return params
          ? combineLatest(
              data.exampleFiles.map((file) => this.#createLoader(file, data.id, params)),
            )
          : [];
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

  #createLoader(exampleFile: string, id: string, params: ModuleParams) {
    const extension = this.#getFileExtension(exampleFile);

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
  #getFileExtension(filePath: string): string {
    return filePath.split('.').pop()!.toUpperCase();
  }
}
