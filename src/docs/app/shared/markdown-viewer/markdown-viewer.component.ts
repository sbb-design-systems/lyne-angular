import { Component, HostBinding, inject, type OnDestroy } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { HtmlLoader } from '../html-loader.service';
import { moduleParams } from '../module-params';

@Component({
  selector: 'sbb-markdown-viewer',
  template: '',
  styleUrls: ['./markdown-viewer.component.scss'],
})
export class MarkdownViewerComponent implements OnDestroy {
  @HostBinding('innerHTML')
  content!: SafeHtml;

  private readonly _destroyed = new Subject<void>();

  private _htmlLoader = inject(HtmlLoader);
  private _route = inject(ActivatedRoute);
  private _domSanitizer = inject(DomSanitizer);

  constructor() {
    moduleParams(this._route)
      .pipe(
        switchMap((params) => this._htmlLoader.withParams(params).fromDocumentation().load()),
        takeUntil(this._destroyed),
      )
      .subscribe((content) => (this.content = this._domSanitizer.bypassSecurityTrustHtml(content)));
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
