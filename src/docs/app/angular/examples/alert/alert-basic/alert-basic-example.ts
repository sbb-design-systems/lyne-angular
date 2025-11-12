import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbAlertModule } from '@sbb-esta/lyne-angular/alert';
import { SbbLink } from '@sbb-esta/lyne-angular/link/link';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic Accordion
 * @order 20
 */
@Component({
  selector: 'sbb-alert-basic-example',
  templateUrl: 'alert-basic-example.html',
  styleUrls: ['alert-basic-example.css'],
  imports: [SbbAlertModule, SbbLink, SbbTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertBasicExample {}
