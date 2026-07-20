import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbChipLabelModule } from '@sbb-esta/lyne-angular/chip-label';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTeaserHeroModule } from '@sbb-esta/lyne-angular/teaser-hero';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title teaser-hero with different variants
 */
@Component({
  selector: 'sbb-teaser-hero-basic-example',
  templateUrl: 'teaser-hero-showcase-example.html',
  imports: [
    FormField,
    SbbTeaserHeroModule,
    SbbImageModule,
    SbbChipLabelModule,
    SbbTitleModule,
    SbbRadioButtonModule,
  ],
})
export class TeaserHeroShowcaseExample {
  protected readonly controls = form(
    signal({
      variant: 'default',
    }),
  );
}
