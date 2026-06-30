import { Component } from '@angular/core';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCarouselModule } from '@sbb-esta/lyne-angular/carousel';
import { SbbChipLabelModule } from '@sbb-esta/lyne-angular/chip-label';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbPaginatorModule } from '@sbb-esta/lyne-angular/paginator';

/**
 * @title Basic carousel
 * @order 1
 */
@Component({
  selector: 'sbb-carousel-basic-example',
  templateUrl: 'carousel-basic-example.html',
  styleUrl: 'carousel-basic-example.scss',
  imports: [
    SbbCardModule,
    SbbCarouselModule,
    SbbChipLabelModule,
    SbbImageModule,
    SbbPaginatorModule,
  ],
})
export class CarouselBasicExample {}
