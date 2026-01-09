import { Component, HostBinding, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { marked } from 'marked';
import { switchMap } from 'rxjs/operators';

import { HtmlLoader } from '../html-loader.service';
import { moduleParams } from '../module-params';

/**
 * Load and convert a Markdown file to HTML.
 */
@Component({
  selector: 'sbb-markdown-viewer',
  template: '',
})
export class MarkdownViewerComponent {
  #htmlLoader = inject(HtmlLoader);
  #route = inject(ActivatedRoute);
  #domSanitizer = inject(DomSanitizer);

  @HostBinding('innerHTML')
  content!: SafeHtml;

  constructor() {
    moduleParams(this.#route)
      .pipe(
        switchMap((params) =>
          params.loaderBuilderInterceptor!(this.#htmlLoader.withParams(params)).load(),
        ),
        switchMap((markdown) => marked.parse(markdown)),
        takeUntilDestroyed(),
      )
      .subscribe((content) => {
        this.content = this.#domSanitizer.bypassSecurityTrustHtml(content);
      });
  }
}
