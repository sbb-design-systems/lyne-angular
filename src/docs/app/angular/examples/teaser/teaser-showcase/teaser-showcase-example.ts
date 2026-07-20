import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbChipLabelModule } from '@sbb-esta/lyne-angular/chip-label';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { type SbbTeaser, SbbTeaserModule } from '@sbb-esta/lyne-angular/teaser';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title teaser with configurable properties
 * @order 1
 */
@Component({
  selector: 'sbb-teaser-showcase-example',
  templateUrl: 'teaser-showcase-example.html',
  imports: [
    FormField,
    SbbTeaserModule,
    SbbChipLabelModule,
    SbbTitleModule,
    SbbImageModule,
    SbbRadioButtonModule,
    SbbCheckboxModule,
  ],
})
export class TeaserShowcaseExample {
  protected readonly loremIpsum = `
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
    At vero eos et accusam et justo duo dolores et ea rebum.
    Stet clita kasd gubergren, no sea takimata sanctus est.
  `;

  protected readonly controls = form(
    signal({
      alignment: 'after' as SbbTeaser['alignment'],
      withChip: false,
      longText: false,
    }),
  );
}
