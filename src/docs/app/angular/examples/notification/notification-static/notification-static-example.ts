import { Component } from '@angular/core';
import { SbbNotificationModule } from '@sbb-esta/lyne-angular/notification';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title static notification without animation
 * @order 2
 */
@Component({
  selector: 'sbb-notification-static-example',
  templateUrl: 'notification-static-example.html',
  imports: [SbbNotificationModule, SbbTitleModule],
})
export class NotificationStaticExample {}
