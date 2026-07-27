import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';

/**
 * @title Select with complex value
 * @order 3
 */
@Component({
  selector: 'sbb-select-complex-value-example',
  templateUrl: 'select-complex-value-example.html',
  imports: [JsonPipe, FormField, SbbCardModule, SbbFormFieldModule, SbbSelectModule],
})
export class SelectComplexValueExample {
  protected readonly options = signal([
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
    {
      id: 3,
      name: 'Option 3',
      price: 19.99,
    },
  ]);

  protected readonly form = form(signal({ select: null as null | typeof this.options }));
}
