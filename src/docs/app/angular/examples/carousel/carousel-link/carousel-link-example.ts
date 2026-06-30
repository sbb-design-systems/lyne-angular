import { Component } from '@angular/core';
import { SbbCarouselModule } from '@sbb-esta/lyne-angular/carousel';
import { SbbPaginatorModule } from '@sbb-esta/lyne-angular/paginator';

/**
 * @title Link carousel
 * @order 2
 */
@Component({
  selector: 'sbb-carousel-link-example',
  templateUrl: './carousel-link-example.html',
  imports: [SbbCarouselModule, SbbPaginatorModule],
})
export class CarouselLinkExample {}
