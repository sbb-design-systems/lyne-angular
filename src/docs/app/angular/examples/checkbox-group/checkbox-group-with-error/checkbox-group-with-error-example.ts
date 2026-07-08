import { Component } from '@angular/core';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title checkbox-group with error
 * @order 3
 */
@Component({
  selector: 'sbb-checkbox-group-with-error-example',
  templateUrl: 'checkbox-group-with-error-example.html',
  imports: [SbbCheckboxModule, SbbFormFieldModule],
})
export class CheckboxGroupWithErrorExample {}
