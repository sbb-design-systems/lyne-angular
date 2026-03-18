import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbOverlayModule } from '@sbb-esta/lyne-angular/overlay';

/**
 * @title Basic overlay
 */
@Component({
  selector: 'sbb-overlay-basic-example',
  templateUrl: 'overlay-basic-example.html',
  imports: [SbbOverlayModule, SbbSecondaryButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayBasicExample {}
