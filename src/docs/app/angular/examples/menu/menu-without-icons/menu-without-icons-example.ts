import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbDividerModule } from '@sbb-esta/lyne-angular/divider';
import { SbbMenuModule } from '@sbb-esta/lyne-angular/menu';

/**
 * @title Menu without icons example.
 * @order 4
 */
@Component({
  selector: 'sbb-menu-without-icons-example',
  templateUrl: 'menu-without-icons-example.html',
  imports: [SbbMenuModule, SbbButtonModule, SbbDividerModule],
})
export class MenuWithoutIconsExample {}
