import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbOverlayModule } from '@sbb-esta/lyne-angular/overlay';

/**
 * @title Basic overlay
 */
@Component({
  selector: 'sbb-overlay-basic-example',
  templateUrl: 'overlay-basic-example.html',
  imports: [SbbOverlayModule, SbbButtonModule],
})
export class OverlayBasicExample {}
