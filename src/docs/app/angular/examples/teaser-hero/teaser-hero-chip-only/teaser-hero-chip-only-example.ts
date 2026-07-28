import { Component } from '@angular/core';
import { SbbChipLabelModule } from '@sbb-esta/lyne-angular/chip-label';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbTeaserHeroModule } from '@sbb-esta/lyne-angular/teaser-hero';

/**
 * @title teaser-hero with image and chip without content
 * @order 3
 */
@Component({
  selector: 'sbb-teaser-hero-chip-only-example',
  templateUrl: 'teaser-hero-chip-only-example.html',
  imports: [SbbTeaserHeroModule, SbbImageModule, SbbChipLabelModule],
})
export class TeaserHeroChipOnlyExample {}
