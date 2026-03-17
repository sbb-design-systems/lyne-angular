import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbLink } from '@sbb-esta/lyne-angular/link/link';
import { SbbNotificationModule } from '@sbb-esta/lyne-angular/notification';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic notification
 */
@Component({
  selector: 'sbb-notification-basic-example',
  templateUrl: 'notification-basic-example.html',
  imports: [SbbNotificationModule, SbbTitleModule, SbbLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationBasicExample {}
