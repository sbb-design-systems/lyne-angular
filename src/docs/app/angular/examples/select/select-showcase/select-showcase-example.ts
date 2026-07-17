import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { disabled, form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import type { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title sbb-select showcase
 * @order 1
 */
@Component({
  selector: 'sbb-select-showcase-example',
  templateUrl: 'select-showcase-example.html',
  imports: [
    FormField,
    SbbCardModule,
    SbbCheckboxModule,
    SbbFormFieldModule,
    SbbRadioButtonModule,
    SbbSelectModule,
    SbbTitleModule,
    JsonPipe,
  ],
})
export class SelectShowcaseExample {
  protected form = form(
    signal<{ select: string | string[] | null }>({ select: null }),
    (schemaPath) => {
      disabled(schemaPath.select, {
        when: () => this.controls.disabled().value(),
      });
    },
  );

  protected controls = form(
    signal({
      multiple: false,
      disabled: false,
      readOnly: false,
      negative: false,
      borderless: false,
      size: null as SbbFormField['size'],
    }),
  );
}
