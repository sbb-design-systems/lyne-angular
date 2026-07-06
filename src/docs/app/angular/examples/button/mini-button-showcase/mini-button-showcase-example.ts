import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title sbb-mini-button with configurable properties
 * @order 40
 */
@Component({
  selector: 'sbb-mini-button-showcase-example',
  templateUrl: 'mini-button-showcase-example.html',
  imports: [
    SbbButtonModule,
    SbbCheckboxModule,
    SbbFormFieldModule,
    SbbRadioButtonModule,
    SbbTitleModule,
    FormField,
  ],
})
export class MiniButtonShowcaseExample {
  protected controls = form(
    signal({
      disabled: false,
      variant: 'icon',
    }),
  );
}
