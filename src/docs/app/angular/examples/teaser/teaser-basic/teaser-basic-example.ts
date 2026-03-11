import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbTeaserModule } from '@sbb-esta/lyne-angular/teaser';

/**
 * @title Basic teaser
 */
@Component({
  selector: 'sbb-teaser-basic-example',
  templateUrl: 'teaser-basic-example.html',
  imports: [SbbTeaserModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeaserBasicExample {}
