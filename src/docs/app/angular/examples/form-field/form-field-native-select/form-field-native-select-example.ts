import { Component } from '@angular/core';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title Form-field with native select
 * @order 2
 */
@Component({
  selector: 'sbb-form-field-native-select-example',
  templateUrl: 'form-field-native-select-example.html',
  imports: [SbbFormFieldModule],
})
export class FormFieldNativeSelectExample {}
