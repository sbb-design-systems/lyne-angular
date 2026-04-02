import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbAlertModule } from '@sbb-esta/lyne-angular/alert';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic sbb-alert
 */
@Component({
  selector: 'sbb-alert-basic-example',
  templateUrl: 'alert-basic-example.html',
  imports: [SbbAlertModule, SbbLinkModule, SbbTitleModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertBasicExample {}
