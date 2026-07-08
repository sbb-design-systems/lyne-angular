import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { type SbbLinkList, SbbLinkListModule } from '@sbb-esta/lyne-angular/link-list';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title sbb-link-list with configurable properties
 * @order 1
 */
@Component({
  selector: 'sbb-link-list-showcase-example',
  templateUrl: 'link-list-showcase-example.html',
  imports: [
    FormField,
    RouterLink,
    SbbLinkListModule,
    SbbLinkModule,
    SbbCheckboxModule,
    SbbRadioButtonModule,
    SbbTitleModule,
  ],
})
export class LinkListShowcaseExample {
  protected controls = form(
    signal({
      orientation: 'vertical' as SbbLinkList['orientation'],
      size: null as SbbLinkList['size'],
      negative: false,
    }),
  );
}
