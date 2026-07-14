import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { type SbbSignet, SbbSignetModule } from '@sbb-esta/lyne-angular/signet';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title sbb-signet with configurable properties
 */
@Component({
  selector: 'sbb-signet-showcase-example',
  templateUrl: 'signet-showcase-example.html',
  styleUrl: 'signet-showcase-example.scss',
  imports: [SbbSignetModule, FormField, SbbRadioButtonModule, SbbTitleModule],
})
export class SignetShowcaseExample {
  protected controls = form(
    signal({
      protectiveRoom: 'ideal' as SbbSignet['protectiveRoom'],
    }),
  );
}
