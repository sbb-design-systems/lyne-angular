import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbDividerModule } from '@sbb-esta/lyne-angular/divider';

/**
 * @title Basic sbb-mini-button-group
 */
@Component({
  selector: 'sbb-button-group-example',
  templateUrl: 'mini-button-group-example.html',
  imports: [SbbButtonModule, SbbDividerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiniButtonGroupExample {}
