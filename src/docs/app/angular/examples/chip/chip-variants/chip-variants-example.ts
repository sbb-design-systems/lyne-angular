import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckbox } from '@sbb-esta/lyne-angular/checkbox';
import { SbbCheckboxGroup } from '@sbb-esta/lyne-angular/checkbox-group';
import { SbbChipModule } from '@sbb-esta/lyne-angular/chip';
import type { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButton } from '@sbb-esta/lyne-angular/radio-button';
import { SbbRadioButtonGroup } from '@sbb-esta/lyne-angular/radio-button-group';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';

/**
 * @title  sbb-chip with configurable properties
 * @order 3
 */
@Component({
  selector: 'sbb-chip-variants-example',
  templateUrl: 'chip-variants-example.html',
  imports: [
    SbbChipModule,
    SbbFormFieldModule,
    FormField,
    SbbCheckbox,
    SbbCheckboxGroup,
    SbbRadioButton,
    SbbRadioButtonGroup,
    SbbTitle,
  ],
})
export class ChipVariantsExample {
  protected controls = form(
    signal({
      addOnBlur: false,
      separatorKeys: null,
      disabled: false,
      readonly: false,
      size: null as SbbFormField['size'],
      hiddenLabel: false,
    }),
  );
}
