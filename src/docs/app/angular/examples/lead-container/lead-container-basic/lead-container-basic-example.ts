import { Component } from '@angular/core';
import { SbbAlertModule } from '@sbb-esta/lyne-angular/alert';
import { SbbBreadcrumbModule } from '@sbb-esta/lyne-angular/breadcrumb';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbLeadContainerModule } from '@sbb-esta/lyne-angular/lead-container';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbNotificationModule } from '@sbb-esta/lyne-angular/notification';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic lead-container
 */
@Component({
  selector: 'sbb-lead-container-basic-example',
  templateUrl: 'lead-container-basic-example.html',
  imports: [
    SbbLeadContainerModule,
    SbbImageModule,
    SbbAlertModule,
    SbbTitleModule,
    SbbLinkModule,
    SbbBreadcrumbModule,
    SbbNotificationModule,
  ],
})
export class LeadContainerBasicExample {}
