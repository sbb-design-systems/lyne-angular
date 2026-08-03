import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import {
  type SbbTeaserProduct,
  SbbTeaserProductModule,
} from '@sbb-esta/lyne-angular/teaser-product';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title teaser-product with configurable properties
 */
@Component({
  selector: 'sbb-teaser-product-showcase-example',
  templateUrl: 'teaser-product-showcase-example.html',
  imports: [
    FormField,
    SbbTeaserProductModule,
    SbbImageModule,
    SbbCheckboxModule,
    SbbRadioButtonModule,
    SbbTitleModule,
  ],
})
export class TeaserProductShowcaseExample {
  protected readonly controls = form(
    signal({
      imageAlignment: 'after' as SbbTeaserProduct['imageAlignment'],
      negative: false,
      withFooter: false,
    }),
  );
}
