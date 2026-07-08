import { Component } from '@angular/core';
import { SbbBadgeModule } from '@sbb-esta/lyne-angular/badge';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbDividerModule } from '@sbb-esta/lyne-angular/divider';
import { SbbMenuModule } from '@sbb-esta/lyne-angular/menu';

/**
 * @title nested menus
 * @order 3
 */
@Component({
  selector: 'sbb-menu-nested-example',
  templateUrl: 'menu-nested-example.html',
  imports: [SbbMenuModule, SbbButtonModule, SbbDividerModule, SbbBadgeModule],
})
export class MenuNestedExample {}
