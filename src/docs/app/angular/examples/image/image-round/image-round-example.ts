import { Component } from '@angular/core';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';

/**
 * @title Round image
 * @order 3
 */
@Component({
  selector: 'sbb-image-round-example',
  templateUrl: 'image-round-example.html',
  styles: `
    :host {
      display: block;
      max-width: 25rem;
    }
  `,
  imports: [SbbImageModule],
})
export class ImageRoundExample {}
