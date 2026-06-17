import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbNotificationModule } from '@sbb-esta/lyne-angular/notification';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title sbb-button with configurable properties
 * @order 30
 */
@Component({
  selector: 'sbb-button-static-variants-example',
  templateUrl: 'button-static-variants-example.html',
  imports: [
    SbbButtonModule,
    SbbCheckboxModule,
    SbbRadioButtonModule,
    SbbTitleModule,
    SbbNotificationModule,
    FormField,
  ],
})
export class ButtonStaticVariantsExample {
  protected controls = form(
    signal({
      disabled: false,
      loading: false,
      variant: 'label',
      size: null,
    }),
  );
}
