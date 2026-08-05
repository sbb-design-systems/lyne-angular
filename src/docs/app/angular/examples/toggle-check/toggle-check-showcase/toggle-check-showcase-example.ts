import { Component, signal } from '@angular/core';
import { disabled, form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import { type SbbToggleCheck, SbbToggleCheckModule } from '@sbb-esta/lyne-angular/toggle-check';

/**
 * @title toggle-check with configurable properties
 * @order 1
 */
@Component({
  selector: 'sbb-toggle-check-showcase-example',
  templateUrl: 'toggle-check-showcase-example.html',
  imports: [
    FormField,
    SbbToggleCheckModule,
    SbbTitleModule,
    SbbCardModule,
    SbbCheckboxModule,
    SbbRadioButtonModule,
  ],
})
export class ToggleCheckShowcaseExample {
  protected controls = form(
    signal({
      checked: false,
      size: null as SbbToggleCheck['size'],
      disabled: false,
      withLabel: true,
      labelPosition: 'after' as SbbToggleCheck['labelPosition'],
      withCustomIcon: false,
    }),
    (schemaPath) => {
      disabled(schemaPath.checked, { when: ({ valueOf }) => valueOf(schemaPath.disabled) });
      disabled(schemaPath.labelPosition, {
        when: ({ valueOf }) => !valueOf(schemaPath.withLabel),
      });
    },
  );
}
