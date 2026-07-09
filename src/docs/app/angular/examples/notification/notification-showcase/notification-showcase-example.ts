import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { type SbbNotification, SbbNotificationModule } from '@sbb-esta/lyne-angular/notification';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title notification with configurable properties
 */
@Component({
  selector: 'sbb-notification-basic-example',
  templateUrl: 'notification-showcase-example.html',
  imports: [
    FormField,
    RouterLink,
    SbbLinkModule,
    SbbCheckboxModule,
    SbbRadioButtonModule,
    SbbNotificationModule,
    SbbTitleModule,
  ],
})
export class NotificationShowcaseExample {
  protected readonly controls = form(
    signal({
      type: 'info' as SbbNotification['type'],
      size: null as SbbNotification['size'],
      hasTitle: true,
      readonly: false,
      hasCustomIcon: false,
    }),
  );
}
