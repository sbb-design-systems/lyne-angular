import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbNavigationModule } from '@sbb-esta/lyne-angular/navigation';

/**
 * @title Basic navigation
 * @order 1
 */
@Component({
  selector: 'sbb-navigation-basic-example',
  templateUrl: 'navigation-basic-example.html',
  imports: [SbbNavigationModule, SbbButtonModule, RouterLink],
})
export class NavigationBasicExample {}
