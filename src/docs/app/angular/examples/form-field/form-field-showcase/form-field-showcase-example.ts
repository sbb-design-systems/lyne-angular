import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { type SbbFormField, SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic form-field
 * @order 1
 */
@Component({
  selector: 'sbb-form-field-showcase-example',
  templateUrl: 'form-field-showcase-example.html',
  imports: [FormField, SbbCheckboxModule, SbbFormFieldModule, SbbRadioButtonModule, SbbTitleModule],
})
export class FormFieldShowcaseExample {
  protected controls = form(
    signal({
      formField: {
        borderless: false,
        floatingLabel: false,
        hiddenLabel: false,
        size: null as SbbFormField['size'],
        width: 'default' as SbbFormField['width'],
      },
      input: {
        disabled: false,
        readonly: false,
      },
    }),
  );
}
