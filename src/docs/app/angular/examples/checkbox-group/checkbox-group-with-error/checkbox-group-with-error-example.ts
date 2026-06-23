import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { type SbbCheckboxGroup } from '@sbb-esta/lyne-angular/checkbox-group';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title checkbox-group with error
 */
@Component({
  selector: 'sbb-checkbox-group-with-error-example',
  templateUrl: 'checkbox-group-with-error-example.html',
  imports: [
    SbbCheckboxModule,
    SbbTitleModule,
    FormField,
    SbbRadioButtonModule,
    SbbSelectModule,
    SbbFormFieldModule,
    SbbCardModule,
  ],
})
export class CheckboxGroupWithErrorExample {
  protected controls = form(
    signal({
      orientation: 'horizontal' as SbbCheckboxGroup['orientation'],
      size: null as SbbCheckboxGroup['size'],
      disabled: false,
      required: false,
      horizontalFrom: null as SbbCheckboxGroup['horizontalFrom'] | null,
    }),
  );
}
