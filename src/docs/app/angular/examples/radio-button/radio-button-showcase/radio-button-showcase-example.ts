import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbNotificationModule } from '@sbb-esta/lyne-angular/notification';
import { type SbbRadioButton, SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic radio-button
 * @order 1
 */
@Component({
  selector: 'sbb-radio-button-showcase-example',
  templateUrl: 'radio-button-showcase-example.html',
  imports: [
    FormField,
    SbbCardModule,
    SbbCheckboxModule,
    SbbRadioButtonModule,
    SbbTitleModule,
    SbbNotificationModule,
  ],
})
export class RadioButtonShowcaseExample {
  protected controls = form(
    signal({
      model: 'one',
      size: null as SbbRadioButton['size'] | null,
      checked: false,
      disabled: false,
      allowEmptySelection: false,
    }),
  );
}
