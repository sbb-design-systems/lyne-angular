import { NgTemplateOutlet } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import type { SbbIconSidebar } from '@sbb-esta/lyne-angular/icon-sidebar';
import { SbbIconSidebarModule } from '@sbb-esta/lyne-angular/icon-sidebar';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import { SbbTooltipModule } from '@sbb-esta/lyne-angular/tooltip';

/**
 * @title icon-sidebar with configurable properties
 * @order 1
 */
@Component({
  selector: 'sbb-icon-sidebar-basic-example',
  templateUrl: 'icon-sidebar-showcase-example.html',
  styleUrl: 'icon-sidebar-showcase-example.scss',
  imports: [
    FormField,
    NgTemplateOutlet,
    SbbIconSidebarModule,
    SbbTooltipModule,
    SbbRadioButtonModule,
    SbbTitleModule,
  ],
})
export class IconSidebarShowcaseExample {
  protected controls = form(
    signal({
      position: 'start',
      color: 'milk' as SbbIconSidebar['color'],
    }),
  );
}
