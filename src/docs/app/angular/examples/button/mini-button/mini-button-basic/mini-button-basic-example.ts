import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbMiniButton } from '@sbb-esta/lyne-angular/button/mini-button';

/**
 * @title Basic sbb-mini-button
 */
@Component({
  selector: 'sbb-button-basic-example',
  templateUrl: 'mini-button-basic-example.html',
  imports: [SbbMiniButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniButtonBasicExample {}
