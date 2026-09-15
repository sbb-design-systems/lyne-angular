import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { type SbbLogoCargo, SbbLogoModule } from '@sbb-esta/lyne-angular/logo';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title <sbb-logo-cargo> with configurable properties
 *
 * @order 2
 */
@Component({
  selector: 'sbb-logo-cargo-showcase-example',
  templateUrl: 'logo-cargo-showcase-example.html',
  styleUrl: 'logo-cargo-showcase-example.scss',
  imports: [FormField, SbbCheckboxModule, SbbLogoModule, SbbRadioButtonModule, SbbTitleModule],
})
export class LogoCargoShowcaseExample {
  protected controls = form(
    signal({
      negative: false,
      protectiveRoom: 'ideal' as SbbLogoCargo['protectiveRoom'],
    }),
  );
}
