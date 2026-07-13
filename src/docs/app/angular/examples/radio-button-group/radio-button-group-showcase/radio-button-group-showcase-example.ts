import { Component, signal } from '@angular/core';
import { disabled, form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import type { SbbRadioButtonGroup } from '@sbb-esta/lyne-angular/radio-button-group';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic radio-button-group
 * @order 1
 */
@Component({
  selector: 'sbb-radio-button-group-basic-example',
  templateUrl: 'radio-button-group-showcase-example.html',
  imports: [FormField, SbbRadioButtonModule, SbbCheckboxModule, SbbTitleModule, SbbCardModule],
})
export class RadioButtonGroupShowcaseExample {
  protected controls = form(
    signal({
      model: 'Value one',
      size: null as SbbRadioButtonGroup['size'],
      orientation: 'horizontal' as SbbRadioButtonGroup['orientation'],
      horizontalFrom: null as SbbRadioButtonGroup['horizontalFrom'] | null,
      disabled: false,
      allowEmptySelection: false,
    }),
    (schemaPath) => {
      disabled(schemaPath.model, { when: ({ valueOf }) => valueOf(schemaPath.disabled) });
      disabled(schemaPath.horizontalFrom, {
        when: ({ valueOf }) => valueOf(schemaPath.orientation) === 'horizontal',
      });
    },
  );
}
