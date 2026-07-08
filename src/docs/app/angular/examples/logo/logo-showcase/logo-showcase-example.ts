import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { type SbbLogo, SbbLogoModule } from '@sbb-esta/lyne-angular/logo';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title <sbb-logo> with configurable properties
 */
@Component({
  selector: 'sbb-logo-showcase-example',
  templateUrl: 'logo-showcase-example.html',
  imports: [FormField, SbbCheckboxModule, SbbLogoModule, SbbRadioButtonModule, SbbTitleModule],
})
export class LogoShowcaseExample {
  protected controls = form(
    signal({
      negative: false,
      protectiveRoom: 'ideal' as SbbLogo['protectiveRoom'],
    }),
  );
}
