import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbAlertModule } from '@sbb-esta/lyne-angular/alert';
import { SbbLink } from '@sbb-esta/lyne-angular/link/link';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic sbb-alert
 */
@Component({
  selector: 'sbb-alert-basic-example',
  templateUrl: 'alert-basic-example.html',
  imports: [SbbAlertModule, SbbLink, SbbTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertBasicExample {}
