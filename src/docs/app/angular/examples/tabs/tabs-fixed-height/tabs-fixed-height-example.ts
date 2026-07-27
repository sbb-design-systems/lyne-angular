import { Component } from '@angular/core';
import { SbbTabsModule } from '@sbb-esta/lyne-angular/tabs';

/**
 * @title Tab group with fixed height
 * @order 2
 */
@Component({
  selector: 'sbb-tabs-fixed-height-example',
  templateUrl: 'tabs-fixed-height-example.html',
  styleUrl: 'tabs-fixed-height-example.scss',
  imports: [SbbTabsModule],
})
export class TabsFixedHeightExample {}
