import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import type { SbbFormFieldElement } from '@sbb-esta/lyne-elements/form-field.pure.js';

/**
 * @title Basic form-field
 * @order 1
 */
@Component({
  selector: 'sbb-form-field-basic-example',
  templateUrl: 'form-field-basic-example.html',
  styleUrl: 'form-field-basic-example.scss',
  imports: [SbbCheckboxModule, SbbFormFieldModule, SbbRadioButtonModule, SbbTitleModule, FormField],
})
export class FormFieldBasicExample {
  protected controls = form(
    signal({
      formField: {
        borderless: false,
        floatingLabel: false,
        hiddenLabel: false,
        size: null as SbbFormFieldElement['size'],
        width: null as SbbFormFieldElement['width'] | null,
      },
      input: {
        disabled: false,
        readonly: false,
      },
    }),
  );
}
