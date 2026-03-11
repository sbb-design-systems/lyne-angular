import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbTooltipModule } from '@sbb-esta/lyne-angular/tooltip';

/**
 * @title Basic tooltip
 */
@Component({
  selector: 'sbb-tooltip-basic-example',
  templateUrl: 'tooltip-basic-example.html',
  imports: [SbbTooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipBasicExample {}
