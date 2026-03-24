import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbBadgeModule } from '@sbb-esta/lyne-angular/badge';
import { SbbHeaderModule } from '@sbb-esta/lyne-angular/header';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';

/**
 * @title Badge on header button
 */
@Component({
  selector: 'sbb-badge-header-button-example',
  templateUrl: 'badge-header-button-example.html',
  imports: [SbbBadgeModule, SbbHeaderModule, SbbIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeHeaderButtonExample {}
