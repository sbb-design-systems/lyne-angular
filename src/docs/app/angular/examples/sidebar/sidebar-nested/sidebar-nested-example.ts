import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbDividerModule } from '@sbb-esta/lyne-angular/divider';
import { SbbHeaderModule } from '@sbb-esta/lyne-angular/header';
import { SbbIconSidebarModule } from '@sbb-esta/lyne-angular/icon-sidebar';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbLinkListModule } from '@sbb-esta/lyne-angular/link-list';
import { SbbSidebarModule } from '@sbb-esta/lyne-angular/sidebar';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import { SbbTooltipModule } from '@sbb-esta/lyne-angular/tooltip';

/**
 * @title icon-sidebar nested with sidebar
 * @order 2
 */
@Component({
  selector: 'sbb-sidebar-nested-example',
  templateUrl: 'sidebar-nested-example.html',
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
export class SidebarNestedExample {}
