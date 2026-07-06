import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import {
  type SbbJourneyHeader,
  SbbJourneyHeaderModule,
} from '@sbb-esta/lyne-angular/journey-header';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Journey-header showcase
 * @order 1
 */
@Component({
  selector: 'sbb-journey-header-showcase-example',
  templateUrl: 'journey-header-showcase-example.html',
  imports: [
    FormField,
    SbbJourneyHeaderModule,
    SbbCheckboxModule,
    SbbRadioButtonModule,
    SbbTitleModule,
  ],
})
export class JourneyHeaderShowcaseExample {
  protected controls = form(
    signal({
      roundTrip: false,
      negative: false,
      level: '3' as SbbJourneyHeader['level'],
      visualLevel: '5' as SbbJourneyHeader['visualLevel'],
    }),
  );
}
