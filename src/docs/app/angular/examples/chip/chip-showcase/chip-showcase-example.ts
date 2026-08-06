import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { disabled, form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbChipModule } from '@sbb-esta/lyne-angular/chip';
import type { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title sbb-chip with configurable properties
 * @order 1
 */
@Component({
  selector: 'sbb-chip-showcase-example',
  templateUrl: 'chip-showcase-example.html',
  imports: [
    FormField,
    SbbChipModule,
    SbbFormFieldModule,
    SbbCheckboxModule,
    SbbRadioButtonModule,
    SbbTitleModule,
    SbbCardModule,
    JsonPipe,
  ],
})
export class ChipShowcaseExample {
  protected controls = form(
    signal({
      model: ['Value 1', 'Value 2', 'Value 3'],
      addOnBlur: false,
      disabled: false,
      readonly: false,
      size: null as SbbFormField['size'],
      hiddenLabel: false,
    }),
    (schemaPath) => {
      disabled(schemaPath.model, { when: ({ valueOf }) => valueOf(schemaPath.disabled) });
    },
  );
}
