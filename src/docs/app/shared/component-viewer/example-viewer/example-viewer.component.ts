import { AsyncPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import { Component, inject, Input, ViewContainerRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import type { SafeHtml } from '@angular/platform-browser';
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
  @Input() exampleData!: ExampleData;

  private _viewContainerRef = inject(ViewContainerRef);

  async ngOnInit() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const module = (await loadExample(this.exampleData.id)) as any;
    this._viewContainerRef.createComponent(module[this.exampleData.name]);
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

  exampleCodes!: Observable<ExampleCode[]>;
  showSource: boolean = false;

  private _defaultExtensionsOrder = ['html', 'ts', 'css', 'scss'];
  private _htmlLoader = inject(HtmlLoader);
  private _route = inject(ActivatedRoute);
  private _domSanitizer = inject(DomSanitizer);

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
            this._defaultExtensionsOrder.indexOf(a.label) -
            this._defaultExtensionsOrder.indexOf(b.label),
        ),
      ),
    );
  }

  stackBlitzEnabled() {
    return moduleParams(this._route).pipe(map((params) => params.packageName === 'angular'));
  }

  /** Load, convert and highlight the example file */
  private _createLoader(exampleFile: string) {
    return moduleParams(this._route).pipe(
      switchMap((params) =>
        this._htmlLoader.withParams(params).fromExamples(this.exampleData.id, exampleFile).load(),
      ),
      switchMap((code) =>
        marked.parse(`\`\`\`${this._getFileExtension(exampleFile)} \n${code}\n\`\`\``),
      ),
      map((code) => this._domSanitizer.bypassSecurityTrustHtml(code)),
    );
  }

  /** Extract the file extension from the example file */
  private _getFileExtension(filePath: string): string {
    return filePath.split('.').pop()!.toUpperCase();
  }
}
