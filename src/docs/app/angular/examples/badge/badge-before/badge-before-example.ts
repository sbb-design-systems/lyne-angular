import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbBadgeModule } from '@sbb-esta/lyne-angular/badge';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';

/**
 * @title Badge position before
 * @order 2
 */
@Component({
  selector: 'sbb-badge-before-example',
  templateUrl: 'badge-before-example.html',
  imports: [SbbBadgeModule, SbbIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeBeforeExample {}
