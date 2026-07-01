import { Component } from '@angular/core';
import { SbbChipLabelModule } from '@sbb-esta/lyne-angular/chip-label';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';

/**
 * @title Image with chips
 * @order 2
 */
@Component({
  selector: 'sbb-image-with-chip-example',
  templateUrl: 'image-with-chip-example.html',
  styles: `
    :host {
      display: block;
      max-width: 30rem;
    }
  `,
  imports: [SbbChipLabelModule, SbbImageModule],
})
export class ImageWithChipExample {}
