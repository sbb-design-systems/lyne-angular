import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCarouselModule } from '@sbb-esta/lyne-angular/carousel';
import { SbbPaginatorModule } from '@sbb-esta/lyne-angular/paginator';

/**
 * @title Button carousel
 * @order 3
 */
@Component({
  selector: 'sbb-carousel-button-example',
  templateUrl: './carousel-button-example.html',
  styleUrl: 'carousel-button-example.scss',
  imports: [SbbButtonModule, SbbCarouselModule, SbbPaginatorModule],
})
export class CarouselButtonExample {}
