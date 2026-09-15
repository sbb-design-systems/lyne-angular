import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { type SbbLogoElvetino, SbbLogoModule } from '@sbb-esta/lyne-angular/logo';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title <sbb-logo-elvetino> with configurable properties
 *
 * @order 4
 */
@Component({
  selector: 'sbb-logo-elvetino-showcase-example',
  templateUrl: 'logo-elvetino-showcase-example.html',
  styleUrl: 'logo-elvetino-showcase-example.scss',
  imports: [FormField, SbbCheckboxModule, SbbLogoModule, SbbRadioButtonModule, SbbTitleModule],
})
export class LogoElvetinoShowcaseExample {
  protected controls = form(
    signal({
      negative: false,
      protectiveRoom: 'ideal' as SbbLogoElvetino['protectiveRoom'],
    }),
  );
}
