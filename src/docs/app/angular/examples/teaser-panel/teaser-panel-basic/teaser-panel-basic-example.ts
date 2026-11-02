import { Component } from '@angular/core';
import { SbbTeaserPanelModule } from '@sbb-esta/lyne-angular/teaser-panel';

/**
 * @title Basic teaser-panel
 */
@Component({
  selector: 'sbb-teaser-panel-basic-example',
  templateUrl: 'teaser-panel-basic-example.html',
  styleUrl: 'teaser-panel-basic-example.scss',
  imports: [SbbTeaserPanelModule],
})
export class TeaserPanelBasicExample {}
