import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbLogoModule } from '@sbb-esta/lyne-angular/logo';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title <sbb-logo-anniversary> with configurable properties
 *
 * @order 5
 */
@Component({
  selector: 'sbb-logo-anniversary-showcase-example',
  templateUrl: 'logo-anniversary-showcase-example.html',
  styleUrl: 'logo-anniversary-showcase-example.scss',
  imports: [FormField, SbbCheckboxModule, SbbLogoModule, SbbRadioButtonModule, SbbTitleModule],
})
export class LogoAnniversaryShowcaseExample {
  protected controls = form(
    signal({
      negative: false,
    }),
  );
}
