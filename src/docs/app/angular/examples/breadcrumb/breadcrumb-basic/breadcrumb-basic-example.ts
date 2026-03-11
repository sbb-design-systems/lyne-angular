import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbBreadcrumbModule } from '@sbb-esta/lyne-angular/breadcrumb';

/**
 * @title Basic breadcrumb
 */
@Component({
  selector: 'sbb-breadcrumb-basic-example',
  templateUrl: 'breadcrumb-basic-example.html',
  imports: [SbbBreadcrumbModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbBasicExample {}
