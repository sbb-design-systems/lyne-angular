import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbChipLabelModule } from '@sbb-esta/lyne-angular/chip-label';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbTeaserModule } from '@sbb-esta/lyne-angular/teaser';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title static teaser
 * @order 4
 */
@Component({
  selector: 'sbb-teaser-with-button-example',
  templateUrl: 'teaser-with-button-example.html',
  imports: [SbbTeaserModule, SbbChipLabelModule, SbbTitleModule, SbbImageModule, SbbButtonModule],
})
export class TeaserWithButtonExample {}
