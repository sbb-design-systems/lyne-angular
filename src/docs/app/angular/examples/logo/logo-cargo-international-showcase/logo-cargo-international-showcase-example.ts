import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { type SbbLogoCargoInternational, SbbLogoModule } from '@sbb-esta/lyne-angular/logo';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title <sbb-logo-cargo-international> with configurable properties
 *
 * @order 3
 */
@Component({
  selector: 'sbb-logo-cargo-international-showcase-example',
  templateUrl: 'logo-cargo-international-showcase-example.html',
  styleUrl: 'logo-cargo-international-showcase-example.scss',
  imports: [FormField, SbbCheckboxModule, SbbLogoModule, SbbRadioButtonModule, SbbTitleModule],
})
export class LogoCargoInternationalShowcaseExample {
  protected controls = form(
    signal({
      negative: false,
      protectiveRoom: 'ideal' as SbbLogoCargoInternational['protectiveRoom'],
    }),
  );
}
