import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbTooltipModule } from '@sbb-esta/lyne-angular/tooltip';

/**
 * @title tooltip example with attribute usage
 * @order 3
 */
@Component({
  selector: 'sbb-tooltip-attribute-example',
  templateUrl: 'tooltip-attribute-example.html',
  imports: [SbbTooltipModule, SbbButtonModule],
})
export class TooltipAttributeExample {}
