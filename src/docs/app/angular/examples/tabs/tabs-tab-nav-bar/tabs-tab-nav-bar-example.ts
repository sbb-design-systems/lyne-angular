import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbTabsModule } from '@sbb-esta/lyne-angular/tabs';

/**
 * @title Tab nav bar with router navigation
 * @order 3
 */
@Component({
  selector: 'sbb-tabs-tab-nav-bar-example',
  templateUrl: 'tabs-tab-nav-bar-example.html',
  imports: [RouterModule, SbbTabsModule, SbbIconModule],
})
export class TabsTabNavBarExample {}
