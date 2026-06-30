import { Component, signal } from '@angular/core';
import { disabled, form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { type SbbCheckbox, SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic checkbox
 * @order 1
 */
@Component({
  selector: 'sbb-checkbox-basic-example',
  templateUrl: 'checkbox-basic-example.html',
  imports: [FormField, SbbCardModule, SbbCheckboxModule, SbbRadioButtonModule, SbbTitleModule],
})
export class CheckboxBasicExample {
  protected controls = form(
    signal({
      model: false,
      size: null as SbbCheckbox['size'] | null,
      disabled: false,
      indeterminate: false,
      iconPlacement: 'end' as SbbCheckbox['iconPlacement'],
    }),
    (s) => {
      disabled(s.model, { when: ({ valueOf }) => valueOf(s.disabled) });
    },
  );
}
