import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SbbAlertModule } from '@sbb-esta/lyne-angular/alert';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic sbb-alert
 */
@Component({
  selector: 'sbb-alert-basic-example',
  templateUrl: 'alert-basic-example.html',
  imports: [RouterLink, SbbAlertModule, SbbLinkModule, SbbTitleModule],
})
export class AlertBasicExample {}
