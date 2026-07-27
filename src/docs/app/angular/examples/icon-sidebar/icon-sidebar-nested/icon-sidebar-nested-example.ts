import { Component, signal, viewChild } from '@angular/core';
import { outputToObservable, toObservable } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbDividerModule } from '@sbb-esta/lyne-angular/divider';
import { SbbHeaderModule } from '@sbb-esta/lyne-angular/header';
import { SbbIconSidebarModule } from '@sbb-esta/lyne-angular/icon-sidebar';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbLinkListModule } from '@sbb-esta/lyne-angular/link-list';
import { SbbSidebar, SbbSidebarModule } from '@sbb-esta/lyne-angular/sidebar';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import { SbbTooltipModule } from '@sbb-esta/lyne-angular/tooltip';
import { merge } from 'rxjs';
import { switchMap } from 'rxjs/operators';

/**
 * @title icon-sidebar nested with sidebar
 * @order 2
 */
@Component({
  selector: 'sbb-icon-sidebar-nested-example',
  templateUrl: 'icon-sidebar-nested-example.html',
  imports: [
    RouterModule,
    SbbCardModule,
    SbbButtonModule,
    SbbIconSidebarModule,
    SbbHeaderModule,
    SbbLinkModule,
    SbbLinkListModule,
    SbbSidebarModule,
    SbbTitleModule,
    SbbTooltipModule,
    SbbDividerModule,
  ],
  host: { class: 'sbb-example-fullscreen-only' },
})
export class IconSidebarNestedExample {
  protected opened = signal<boolean>(true);
  protected sidebar = viewChild.required(SbbSidebar);

  constructor() {
    toObservable(this.sidebar)
      .pipe(
        switchMap((sidebar) =>
          merge(
            outputToObservable(sidebar.beforeOpenOutput),
            outputToObservable(sidebar.beforeCloseOutput),
          ),
        ),
      )
      .subscribe((event) => this.opened.set(event?.type === 'beforeopen'));
  }
}
