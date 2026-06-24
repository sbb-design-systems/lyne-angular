import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbNotificationModule } from '@sbb-esta/lyne-angular/notification';

/**
 * @title Basic sbb-button-link example
 * @order 20
 */
@Component({
  selector: 'sbb-button-link-basic-example',
  templateUrl: 'button-link-basic-example.html',
  imports: [SbbButtonModule, SbbNotificationModule],
})
export class ButtonLinkBasicExample {}
