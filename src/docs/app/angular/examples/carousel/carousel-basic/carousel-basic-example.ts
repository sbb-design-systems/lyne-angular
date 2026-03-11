import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbCarouselModule } from '@sbb-esta/lyne-angular/carousel';

/**
 * @title Basic carousel
 */
@Component({
  selector: 'sbb-carousel-basic-example',
  templateUrl: 'carousel-basic-example.html',
  imports: [SbbCarouselModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselBasicExample {}
