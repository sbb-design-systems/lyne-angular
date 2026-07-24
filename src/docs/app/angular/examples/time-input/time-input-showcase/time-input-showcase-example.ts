import { Component, signal } from '@angular/core';
import { disabled, form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbTimeInputModule } from '@sbb-esta/lyne-angular/time-input';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title time-input with configurable properties
 * @order 1
 */
@Component({
  selector: 'sbb-time-input-basic-example',
  templateUrl: 'time-input-showcase-example.html',
  imports: [
    FormField,
    SbbTimeInputModule,
    SbbFormFieldModule,
    SbbIconModule,
    SbbTitleModule,
    SbbCheckboxModule,
    SbbCardModule,
  ],
})
export class TimeInputShowcaseExample {
  protected readonly controls = form(
    signal({
      model: new Date(1970, 0, 1, 15, 15, 0),
      disabled: false,
      readonly: false,
      withIcons: false,
    }),
    (schemaPath) => {
      disabled(schemaPath.model, {
        when: ({ valueOf }) => valueOf(schemaPath.disabled),
      });
    },
  );
}
