import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Checkbox in a form
 */
@Component({
  selector: 'sbb-checkbox-with-form-example',
  templateUrl: 'checkbox-with-form-example.html',
  imports: [
    SbbCheckboxModule,
    SbbButtonModule,
    SbbCardModule,
    SbbTitleModule,
    SbbFormFieldModule,
    FormField,
  ],
})
export class CheckboxWithFormExample {
  submitHandler = (e: SubmitEvent) => {
    e.preventDefault();
    const form = (e.target as HTMLFormElement)!;
    this.formData = JSON.stringify(Object.fromEntries(new FormData(form)));
    console.log(this.formData);
  };

  protected formData = '';
  protected controls = form(
    signal({
      fieldName: 'name',
      fieldValue: 'value',
    }),
  );
}
