import { Component, viewChild } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbIconSidebarModule } from '@sbb-esta/lyne-angular/icon-sidebar';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbLinkListModule } from '@sbb-esta/lyne-angular/link-list';
import { SbbSidebar, SbbSidebarModule } from '@sbb-esta/lyne-angular/sidebar';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import { SbbTooltipModule } from '@sbb-esta/lyne-angular/tooltip';

/**
 * @title icon-sidebar nested with sidebar
 */
@Component({
  selector: 'sbb-icon-sidebar-nested-example',
  templateUrl: 'icon-sidebar-nested-example.html',
  styleUrl: 'icon-sidebar-nested-example.scss',
  imports: [
    SbbIconSidebarModule,
    SbbButtonModule,
    SbbTooltipModule,
    SbbSidebarModule,
    SbbLinkListModule,
    SbbLinkModule,
    SbbTitleModule,
  ],
})
export class IconSidebarNestedExample {
  protected sidebar = viewChild.required(SbbSidebar);

  toggleSidebar() {
    this.sidebar().toggle();
  }
}
