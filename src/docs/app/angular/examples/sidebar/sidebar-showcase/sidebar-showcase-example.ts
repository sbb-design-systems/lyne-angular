import { Component, signal, viewChild } from '@angular/core';
import { outputToObservable, toObservable } from '@angular/core/rxjs-interop';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbLinkListModule } from '@sbb-esta/lyne-angular/link-list';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbRadioButtonGroupModule } from '@sbb-esta/lyne-angular/radio-button-group';
import { SbbSidebar, SbbSidebarModule } from '@sbb-esta/lyne-angular/sidebar';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import { switchMap } from 'rxjs/operators';

/**
 * @title Sidebar showcase
 * @order 1
 */
@Component({
  selector: 'sbb-sidebar-showcase-example',
  templateUrl: 'sidebar-showcase-example.html',
  styleUrl: 'sidebar-showcase-example.scss',
  imports: [
    FormField,
    SbbCheckboxModule,
    SbbLinkListModule,
    SbbLinkModule,
    SbbSidebarModule,
    SbbRadioButtonModule,
    SbbRadioButtonGroupModule,
    SbbTitleModule,
  ],
})
export class SidebarShowcaseExample {
  protected controls = form(
    signal({
      position: 'start' as SbbSidebar['position'],
      mode: 'side' as SbbSidebar['mode'],
      color: 'milk' as SbbSidebar['color'],
      opened: true,
    }),
  );

  private sidebar = viewChild.required(SbbSidebar);

  constructor() {
    toObservable(this.sidebar)
      .pipe(switchMap((sidebar) => outputToObservable(sidebar.openOutput)))
      .subscribe((sidebar) => console.log(sidebar, 'opened'));
  }
}
