import { Component } from '@angular/core';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';

/**
 * @title Basic image
 * @order 1
 */
@Component({
  selector: 'sbb-image-basic-example',
  templateUrl: 'image-basic-example.html',
  styles: `
    :host {
      display: block;
      max-width: 30rem;
    }
  `,
  imports: [SbbImageModule],
})
export class ImageBasicExample {}
