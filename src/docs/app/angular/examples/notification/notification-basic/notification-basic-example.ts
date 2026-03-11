import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbNotificationModule } from '@sbb-esta/lyne-angular/notification';

/**
 * @title Basic notification
 */
@Component({
  selector: 'sbb-notification-basic-example',
  templateUrl: 'notification-basic-example.html',
  imports: [SbbNotificationModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationBasicExample {}
