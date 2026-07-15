import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbSliderModule } from '@sbb-esta/lyne-angular/slider';

/**
 * @title Slider with signal forms
 * @order 2
 */
@Component({
  selector: 'sbb-slider-signal-example',
  templateUrl: 'slider-signal-example.html',
  imports: [FormField, SbbCardModule, SbbSliderModule],
})
export class SliderSignalExample {
  protected signalForm = form(signal({ slider: '0' }));
}
