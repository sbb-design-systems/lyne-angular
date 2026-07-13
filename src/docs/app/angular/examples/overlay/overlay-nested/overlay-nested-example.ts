import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbOverlayModule } from '@sbb-esta/lyne-angular/overlay';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title nested overlays
 * @order 3
 */
@Component({
  selector: 'sbb-overlay-nested-example',
  templateUrl: 'overlay-nested-example.html',
  imports: [SbbOverlayModule, SbbButtonModule, SbbTitleModule],
})
export class OverlayNestedExample {}
