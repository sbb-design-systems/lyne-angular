import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';

/**
 * @title radio-button group with compareWith function
 * @order 5
 */
@Component({
  selector: 'sbb-radio-button-group-compare-with-example',
  templateUrl: 'radio-button-group-compare-with-example.html',
  imports: [FormField, JsonPipe, SbbRadioButtonModule, SbbCardModule],
})
export class RadioButtonGroupCompareWithExample {
  protected readonly options = [
    {
      id: 1,
      name: 'Option 1',
    },
    {
      id: 2,
      name: 'Option 2',
    },
    {
      id: 3,
      name: 'Option 3',
    },
  ];
  protected readonly form = form(
    signal({
      radio: {
        id: 1,
        name: 'Option 1',
      },
    }),
  );
  protected compareWith = (v1: { id: number } | null, v2: { id: number } | null) =>
    v1?.id === v2?.id;
}
