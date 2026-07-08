import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbNavigationModule } from '@sbb-esta/lyne-angular/navigation';

/**
 * @title Basic navigation
 * @order 1
 */
@Component({
  selector: 'sbb-navigation-basic-example',
  templateUrl: 'navigation-basic-example.html',
  imports: [SbbNavigationModule, SbbButtonModule],
})
export class NavigationBasicExample {}
