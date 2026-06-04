import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title Form-field with clear button
 * @order 3
 */
@Component({
  selector: 'sbb-form-field-clear-example',
  templateUrl: 'form-field-clear-example.html',
  imports: [ReactiveFormsModule, SbbFormFieldModule],
})
export class FormFieldClearExample {
  protected input = new FormControl('input', { nonNullable: true });
}
