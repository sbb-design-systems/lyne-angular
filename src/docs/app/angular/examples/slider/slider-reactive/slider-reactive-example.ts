import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbSliderModule } from '@sbb-esta/lyne-angular/slider';

/**
 * @title Slider in a reactive form
 * @order 3
 */
@Component({
  selector: 'sbb-slider-reactive-example',
  templateUrl: 'slider-reactive-example.html',
  imports: [ReactiveFormsModule, SbbCardModule, SbbSliderModule],
})
export class SliderReactiveExample {
  protected control = new FormControl<string>('0');
}
