import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbTeaserProductModule } from '@sbb-esta/lyne-angular/teaser-product';

/**
 * @title Basic teaser-product
 */
@Component({
  selector: 'sbb-teaser-product-basic-example',
  templateUrl: 'teaser-product-basic-example.html',
  imports: [SbbTeaserProductModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeaserProductBasicExample {}
