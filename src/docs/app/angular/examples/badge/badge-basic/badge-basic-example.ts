import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbBadgeModule } from '@sbb-esta/lyne-angular/badge';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';

/**
 * @title Basic badge
 * @order 1
 */
@Component({
  selector: 'sbb-badge-basic-example',
  templateUrl: 'badge-basic-example.html',
  imports: [SbbBadgeModule, SbbIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeBasicExample {}
