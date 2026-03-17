import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';

/**
 * @title Basic image
 */
@Component({
  selector: 'sbb-image-basic-example',
  templateUrl: 'image-basic-example.html',
  imports: [SbbImageModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageBasicExample {}
