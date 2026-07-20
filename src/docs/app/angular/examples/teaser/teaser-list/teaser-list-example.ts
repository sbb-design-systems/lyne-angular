import { Component } from '@angular/core';
import { SbbChipLabelModule } from '@sbb-esta/lyne-angular/chip-label';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbTeaserModule } from '@sbb-esta/lyne-angular/teaser';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title multiple teaser in list
 * @order 2
 */
@Component({
  selector: 'sbb-teaser-composed-example',
  templateUrl: 'teaser-list-example.html',
  styleUrl: 'teaser-list-example.scss',
  imports: [SbbTeaserModule, SbbChipLabelModule, SbbTitleModule, SbbImageModule],
})
export class TeaserListExample {}
