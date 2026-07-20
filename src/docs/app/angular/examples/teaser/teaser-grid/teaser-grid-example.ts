import { Component } from '@angular/core';
import { SbbChipLabelModule } from '@sbb-esta/lyne-angular/chip-label';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbTeaserModule } from '@sbb-esta/lyne-angular/teaser';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title multiple teaser in grid
 * @order 3
 */
@Component({
  selector: 'sbb-teaser-grid-example',
  templateUrl: 'teaser-grid-example.html',
  styleUrl: 'teaser-grid-example.scss',
  imports: [SbbTeaserModule, SbbChipLabelModule, SbbTitleModule, SbbImageModule],
})
export class TeaserGridExample {}
