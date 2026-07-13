import { Component } from '@angular/core';
import { SbbPaginatorModule } from '@sbb-esta/lyne-angular/paginator';

/**
 * @title <component name> with configurable properties
 * @order 2
 */
@Component({
  selector: 'sbb-paginator-compact-example',
  templateUrl: 'paginator-compact-example.html',
  imports: [SbbPaginatorModule],
})
export class PaginatorCompactExample {}
