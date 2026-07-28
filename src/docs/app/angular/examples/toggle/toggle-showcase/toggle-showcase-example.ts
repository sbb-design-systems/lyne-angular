import { Component, signal } from '@angular/core';
import { disabled, form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbRadioButton, SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import type { SbbToggle } from '@sbb-esta/lyne-angular/toggle';
import { SbbToggleModule } from '@sbb-esta/lyne-angular/toggle';

/**
 * @title Basic toggle
 */
@Component({
  selector: 'sbb-toggle-showcase-example',
  templateUrl: 'toggle-showcase-example.html',
  imports: [
    FormField,
    SbbToggleModule,
    SbbTitleModule,
    SbbRadioButtonModule,
    SbbCheckboxModule,
    SbbRadioButton,
    SbbCardModule,
  ],
})
export class ToggleShowcaseExample {
  protected readonly controls = form(
    signal({
      toggle: 'Zürich',
      size: null as SbbToggle['size'],
      disabled: false,
      even: false,
      hasLabel: true,
      hasIcon: false,
    }),
    (schemaPath) => {
      disabled(schemaPath.toggle, { when: ({ valueOf }) => valueOf(schemaPath.disabled) });
      disabled(schemaPath.hasLabel, {
        when: ({ valueOf }) => valueOf(schemaPath.hasLabel) && !valueOf(schemaPath.hasIcon),
      });
      disabled(schemaPath.hasIcon, {
        when: ({ valueOf }) => valueOf(schemaPath.hasIcon) && !valueOf(schemaPath.hasLabel),
      });
    },
  );
}
