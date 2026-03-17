import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbSliderModule } from '@sbb-esta/lyne-angular/slider';

/**
 * @title Basic slider
 */
@Component({
  selector: 'sbb-slider-basic-example',
  templateUrl: 'slider-basic-example.html',
  imports: [SbbSliderModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderBasicExample {}
