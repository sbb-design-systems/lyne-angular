import { Component, signal } from '@angular/core';
import { disabled, form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import type { SbbCheckboxGroup } from '@sbb-esta/lyne-angular/checkbox-group';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic checkbox-group
 * @order 1
 */
@Component({
  selector: 'sbb-checkbox-group-showcase-example',
  templateUrl: 'checkbox-group-showcase-example.html',
  imports: [
    SbbCheckboxModule,
    SbbTitleModule,
    FormField,
    SbbRadioButtonModule,
    SbbSelectModule,
    SbbFormFieldModule,
  ],
})
export class CheckboxGroupShowcaseExample {
  protected controls = form(
    signal({
      orientation: 'horizontal' as SbbCheckboxGroup['orientation'],
      size: null as SbbCheckboxGroup['size'],
      horizontalFrom: null as SbbCheckboxGroup['horizontalFrom'] | null,
    }),
    (schemaPath) => {
      disabled(schemaPath.horizontalFrom, {
        when: ({ valueOf }) => valueOf(schemaPath.orientation) === 'horizontal',
      });
    },
  );
}
