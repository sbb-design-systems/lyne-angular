import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbCarouselModule } from '@sbb-esta/lyne-angular/carousel';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbPaginatorModule } from '@sbb-esta/lyne-angular/paginator';

/**
 * @title Basic carousel
 */
@Component({
  selector: 'sbb-carousel-basic-example',
  templateUrl: 'carousel-basic-example.html',
  imports: [SbbCarouselModule, SbbImageModule, SbbPaginatorModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselBasicExample {}
