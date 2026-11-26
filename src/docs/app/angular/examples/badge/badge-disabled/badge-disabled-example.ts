import { Component } from '@angular/core';
import { SbbBadgeModule } from '@sbb-esta/lyne-angular/badge';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';

/**
 * @title Badge position before
 * @order 4
 */
@Component({
  selector: 'sbb-badge-disabled-example',
  templateUrl: 'badge-disabled-example.html',
  imports: [SbbBadgeModule, SbbIconModule],
})
export class BadgeDisabledExample {}
