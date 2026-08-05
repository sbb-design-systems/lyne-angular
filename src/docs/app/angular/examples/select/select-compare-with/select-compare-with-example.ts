import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';

/**
 * @title Select with compare-with function
 * @order 4
 */
@Component({
  selector: 'sbb-select-compare-with-example',
  templateUrl: 'select-compare-with-example.html',
  imports: [JsonPipe, FormField, SbbCardModule, SbbFormFieldModule, SbbSelectModule],
})
export class SelectCompareWithExample {
  protected readonly simplifiedOptions = [
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
      select: [
        {
          id: 1,
          name: 'Option 1',
          price: 9.99,
        },
        {
          id: 2,
          name: 'Option 2',
          price: 4.99,
        },
      ],
    }),
  );
  protected compareWith = (v1: { id: string } | null, v2: { id: string } | null) =>
    v1?.id === v2?.id;
}
