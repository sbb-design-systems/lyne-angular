import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import type { SbbFormFieldElement } from '@sbb-esta/lyne-elements/form-field.js';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldBasicExample {
  protected controls = new FormGroup({
    formField: new FormGroup({
      borderless: new FormControl(false, { nonNullable: true }),
      floatingLabel: new FormControl(false, { nonNullable: true }),
      hiddenLabel: new FormControl(false, { nonNullable: true }),
      size: new FormControl<SbbFormFieldElement['size'] | null>(null),
      width: new FormControl<SbbFormFieldElement['width'] | null>(null),
    }),
    input: new FormGroup({
      disabled: new FormControl(false, { nonNullable: true }),
      readonly: new FormControl(false, { nonNullable: true }),
    }),
  });
}
