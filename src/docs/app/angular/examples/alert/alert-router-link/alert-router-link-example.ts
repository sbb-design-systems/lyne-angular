import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SbbAlertModule } from '@sbb-esta/lyne-angular/alert';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title sbb-alert with routerLink
 */
@Component({
  selector: 'sbb-router-link-example',
  templateUrl: 'alert-router-link-example.html',
  imports: [SbbAlertModule, SbbLinkModule, SbbTitleModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertRouterLinkExample {}
