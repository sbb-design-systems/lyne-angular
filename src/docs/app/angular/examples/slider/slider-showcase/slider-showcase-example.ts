import { Component, signal } from '@angular/core';
import { disabled, form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbSliderModule } from '@sbb-esta/lyne-angular/slider';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title sbb-slider showcase
 * @order 1
 */
@Component({
  selector: 'sbb-slider-showcase-example',
  templateUrl: 'slider-showcase-example.html',
  imports: [
    FormField,
    SbbCardModule,
    SbbCheckboxModule,
    SbbFormFieldModule,
    SbbSliderModule,
    SbbTitleModule,
  ],
})
export class SliderShowcaseExample {
  protected form = form(signal({ slider: '50', inFormField: '50' }), (schemaPath) => {
    disabled(schemaPath.slider, {
      when: () => this.controls.disabled().value(),
    });
    disabled(schemaPath.inFormField, {
      when: () => this.controls.disabled().value(),
    });
  });

  protected controls = form(
    signal({
      min: 0,
      max: 100,
      disabled: false,
      readOnly: false,
      startIcon: true,
      endIcon: true,
    }),
  );
}
