import { Component, signal } from '@angular/core';
import { disabled, form, FormField } from '@angular/forms/signals';
import type { SbbButton } from '@sbb-esta/lyne-angular/button';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title sbb-button with configurable properties
 * @order 10
 */
@Component({
  selector: 'sbb-button-variants-example',
  templateUrl: 'button-variants-example.html',
  imports: [SbbButtonModule, SbbCheckboxModule, SbbRadioButtonModule, SbbTitleModule, FormField],
})
export class ButtonVariantsExample {
  protected controls = form(
    signal({
      disabled: false,
      loading: false,
      variant: 'label',
      size: null as SbbButton['size'],
    }),
    (schemaPath) => {
      disabled(schemaPath.loading, {
        when: ({ valueOf }) => valueOf(schemaPath.disabled),
      });
    },
  );
}
