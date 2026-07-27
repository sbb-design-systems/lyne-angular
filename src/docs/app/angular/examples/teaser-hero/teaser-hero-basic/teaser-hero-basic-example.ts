import { Component } from '@angular/core';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbTeaserHeroModule } from '@sbb-esta/lyne-angular/teaser-hero';

/**
 * @title basic teaser-hero
 * @order 1
 */
@Component({
  selector: 'sbb-teaser-hero-basic-example',
  templateUrl: 'teaser-hero-basic-example.html',
  imports: [SbbTeaserHeroModule, SbbImageModule],
})
export class TeaserHeroBasicExample {}
