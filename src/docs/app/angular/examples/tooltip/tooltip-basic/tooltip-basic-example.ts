import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbTooltipModule } from '@sbb-esta/lyne-angular/tooltip';

/**
 * @title Basic tooltip
 */
@Component({
  selector: 'sbb-tooltip-basic-example',
  templateUrl: 'tooltip-basic-example.html',
  imports: [SbbTooltipModule, SbbButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipBasicExample {}
