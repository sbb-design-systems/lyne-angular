import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import type { SbbButtonLink } from '@sbb-esta/lyne-angular/button';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbNotificationModule } from '@sbb-esta/lyne-angular/notification';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title sbb-button-link with configurable properties
 * @order 20
 */
@Component({
  selector: 'sbb-button-link-variants-example',
  templateUrl: 'button-link-variants-example.html',
  imports: [
    SbbButtonModule,
    SbbCheckboxModule,
    SbbRadioButtonModule,
    SbbNotificationModule,
    SbbTitleModule,
    SbbFormFieldModule,
    FormField,
  ],
})
export class ButtonLinkVariantsExample {
  protected controls = form(
    signal({
      disabled: false,
      loading: false,
      variant: 'label',
      size: null as SbbButtonLink['size'],
      href: 'https://www.sbb.ch',
      isBlank: true,
    }),
  );
}
