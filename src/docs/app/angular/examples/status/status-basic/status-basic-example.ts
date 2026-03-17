import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbStatusModule } from '@sbb-esta/lyne-angular/status';

/**
 * @title Basic status
 */
@Component({
  selector: 'sbb-status-basic-example',
  templateUrl: 'status-basic-example.html',
  imports: [SbbStatusModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBasicExample {}
