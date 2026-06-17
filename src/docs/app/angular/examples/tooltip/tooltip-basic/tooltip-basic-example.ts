import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbTooltipModule } from '@sbb-esta/lyne-angular/tooltip';

/**
 * @title Basic tooltip
 */
@Component({
  selector: 'sbb-tooltip-basic-example',
  templateUrl: 'tooltip-basic-example.html',
  imports: [SbbTooltipModule, SbbButtonModule],
})
export class TooltipBasicExample {}
