import { Component } from '@angular/core';
import { SbbChipLabelModule } from '@sbb-esta/lyne-angular/chip-label';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbTeaserHero } from '@sbb-esta/lyne-angular/teaser-hero';

/**
 * @title teaser-hero with image, chip and content
 * @order 2
 */
@Component({
  selector: 'sbb-teaser-hero-with-chip-example',
  templateUrl: 'teaser-hero-with-chip-example.html',
  imports: [SbbChipLabelModule, SbbImageModule, SbbTeaserHero],
})
export class TeaserHeroWithChipExample {}
