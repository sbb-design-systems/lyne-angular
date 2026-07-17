import { Component } from '@angular/core';
import { SbbTabsModule } from '@sbb-esta/lyne-angular/tabs';

/**
 * @title Lazy loaded tab content using sbbTabContent
 * @order 4
 */
@Component({
  selector: 'sbb-tabs-lazy-content-example',
  templateUrl: 'tabs-lazy-content-example.html',
  imports: [SbbTabsModule],
})
export class TabsLazyContentExample {}
