import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbBreadcrumbModule } from '@sbb-esta/lyne-angular/breadcrumb';

/**
 * @title Basic breadcrumb-group
 */
@Component({
  selector: 'sbb-breadcrumb-group-example',
  templateUrl: 'breadcrumb-group-example.html',
  imports: [SbbBreadcrumbModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbGroupExample {}
