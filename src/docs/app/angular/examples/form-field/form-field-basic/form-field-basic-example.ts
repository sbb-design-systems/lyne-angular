import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
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
  imports: [
    ReactiveFormsModule,
    SbbCheckboxModule,
    SbbFormFieldModule,
    SbbRadioButtonModule,
    SbbTitleModule,
  ],
})
export class FormFieldBasicExample {
  private formBuilder = inject(FormBuilder);

  protected controls = this.formBuilder.group({
    formField: this.formBuilder.group({
      borderless: this.formBuilder.control(false),
      floatingLabel: this.formBuilder.control(false),
      hiddenLabel: this.formBuilder.control(false),
      size: this.formBuilder.control<SbbFormFieldElement['size'] | null>(null),
      width: this.formBuilder.control<SbbFormFieldElement['width'] | null>(null),
    }),
    input: this.formBuilder.group({
      disabled: this.formBuilder.control(false),
      readonly: this.formBuilder.control(false),
    }),
  });
}
