import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import {
  type SbbLinkListAnchor,
  SbbLinkListAnchorModule,
} from '@sbb-esta/lyne-angular/link-list-anchor';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title sbb-link-list-anchor with configurable properties
 * @order 1
 */
@Component({
  selector: 'sbb-link-list-anchor-showcase-example',
  templateUrl: 'link-list-anchor-showcase-example.html',
  imports: [
    FormField,
    RouterLink,
    SbbLinkListAnchorModule,
    SbbLinkModule,
    SbbCheckboxModule,
    SbbRadioButtonModule,
    SbbTitleModule,
  ],
})
export class LinkListAnchorShowcaseExample {
  protected controls = form(
    signal({
      size: null as SbbLinkListAnchor['size'],
      negative: false,
    }),
  );
}
