import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { type SbbCheckbox, SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic checkbox
 */
@Component({
  selector: 'sbb-checkbox-basic-example',
  templateUrl: 'checkbox-basic-example.html',
  imports: [FormField, SbbCheckboxModule, SbbRadioButtonModule, SbbTitleModule],
})
export class CheckboxBasicExample {
  protected controls = form(
    signal({
      size: 'm' as SbbCheckbox['size'],
      checked: false,
      disabled: false,
      indeterminate: false,
      iconPlacement: 'end' as SbbCheckbox['iconPlacement'],
    }),
  );
}
