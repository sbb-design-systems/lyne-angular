import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { marked } from 'marked';
import { map, switchMap } from 'rxjs/operators';

import { HtmlLoader } from '../html-loader.service';
import { moduleParams } from '../module-params';

import '@sbb-esta/lyne-elements/title.js';
import '@sbb-esta/lyne-elements/link.js';
import '@sbb-esta/lyne-elements/link-list-anchor.js';

/**
 * Load and convert a Markdown file to HTML.
 */
@Component({
  selector: 'sbb-markdown-viewer',
  template: '',
  host: {
    '[innerHTML]': 'content()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkdownViewerComponent {
  #htmlLoader = inject(HtmlLoader);
  #route = inject(ActivatedRoute);
  #domSanitizer = inject(DomSanitizer);

  content = toSignal(
    moduleParams(this.#route).pipe(
      switchMap((params) =>
        params.loaderBuilderInterceptor!(this.#htmlLoader.withParams(params)).load(),
      ),
      switchMap((markdown) =>
        marked
          .use({
            hooks: {
              postprocess: (html: string) =>
                html
                  .replace(/<a /g, '<sbb-link ')
                  .replace(/<\/a>/g, '</sbb-link>')
                  .replaceAll(
                    'href="#',
                    `href="${window.location.origin}${window.location.pathname}#`,
                  ),
            },
          })
          .parse(markdown),
      ),
      map((html) => this.#domSanitizer.bypassSecurityTrustHtml(html)),
    ),
  );
}
