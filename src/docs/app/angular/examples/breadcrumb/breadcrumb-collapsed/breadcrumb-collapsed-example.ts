import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SbbBreadcrumbModule } from '@sbb-esta/lyne-angular/breadcrumb';

/**
 * @title Basic breadcrumb
 */
@Component({
  selector: 'sbb-breadcrumb-collapsed-example',
  templateUrl: 'breadcrumb-collapsed-example.html',
  imports: [SbbBreadcrumbModule, RouterLink],
})
export class BreadcrumbCollapsedExample {}
