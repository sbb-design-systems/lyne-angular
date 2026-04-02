import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbChipLabelModule } from '@sbb-esta/lyne-angular/chip-label';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbTeaserModule } from '@sbb-esta/lyne-angular/teaser';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic teaser
 */
@Component({
  selector: 'sbb-teaser-basic-example',
  templateUrl: 'teaser-basic-example.html',
  imports: [SbbTeaserModule, SbbChipLabelModule, SbbTitleModule, SbbImageModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeaserBasicExample {}
