import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbSliderModule } from '@sbb-esta/lyne-angular/slider';

/**
 * @title Slider in a template-driven form
 * @order 4
 */
@Component({
  selector: 'sbb-slider-template-driven-example',
  templateUrl: 'slider-template-driven-example.html',
  imports: [FormsModule, SbbCardModule, SbbSliderModule],
})
export class SliderTemplateDrivenExample {
  protected model: string = '0';
}
