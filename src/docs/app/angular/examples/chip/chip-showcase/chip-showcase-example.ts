import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
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
  ],
})
export class ChipShowcaseExample {
  protected controls = form(
    signal({
      addOnBlur: false,
      disabled: false,
      readonly: false,
      size: null as SbbFormField['size'],
      hiddenLabel: false,
    }),
  );
}
