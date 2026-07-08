import { Component } from '@angular/core';
import { SbbBadgeModule } from '@sbb-esta/lyne-angular/badge';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbDividerModule } from '@sbb-esta/lyne-angular/divider';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbMenuModule } from '@sbb-esta/lyne-angular/menu';

/**
 * @title menu with custom content
 * @order 2
 */
@Component({
  selector: 'sbb-menu-custom-content-example',
  templateUrl: 'menu-custom-content-example.html',
  styleUrl: 'menu-custom-content-example.scss',
  imports: [SbbMenuModule, SbbLinkModule, SbbButtonModule, SbbDividerModule, SbbBadgeModule],
})
export class MenuCustomContentExample {}
