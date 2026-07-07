import { Component, DestroyRef, inject, signal, viewChild } from '@angular/core';
import { outputToObservable, takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
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

/**
 * @title icon-sidebar nested with sidebar
 * @order 2
 */
@Component({
  selector: 'sbb-icon-sidebar-nested-example',
  templateUrl: 'icon-sidebar-nested-example.html',
  imports: [
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
})
export class IconSidebarNestedExample {
  protected opened = signal<boolean>(true);
  protected sidebar = viewChild.required(SbbSidebar);
  private destroyRef = inject(DestroyRef);

  constructor() {
    toObservable(this.sidebar).subscribe((sidebar) => {
      merge(
        outputToObservable(sidebar.beforeOpenOutput),
        outputToObservable(sidebar.beforeCloseOutput),
      )
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((event) => this.opened.set(event?.type === 'beforeopen'));
    });
  }
}
