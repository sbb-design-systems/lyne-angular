import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbNotificationModule } from '@sbb-esta/lyne-angular/notification';

/**
 * @title Basic sbb-button-static example
 * @order 30
 */
@Component({
  selector: 'sbb-button-static-basic-example',
  templateUrl: 'button-static-basic-example.html',
  imports: [SbbButtonModule, SbbNotificationModule],
})
export class ButtonStaticBasicExample {}
