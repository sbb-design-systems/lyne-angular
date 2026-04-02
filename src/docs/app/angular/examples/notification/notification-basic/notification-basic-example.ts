import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbNotificationModule } from '@sbb-esta/lyne-angular/notification';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic notification
 */
@Component({
  selector: 'sbb-notification-basic-example',
  templateUrl: 'notification-basic-example.html',
  imports: [SbbNotificationModule, SbbTitleModule, SbbLinkModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationBasicExample {}
