import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbPaginatorModule } from '@sbb-esta/lyne-angular/paginator';

/**
 * @title Basic paginator
 */
@Component({
  selector: 'sbb-paginator-basic-example',
  templateUrl: 'paginator-basic-example.html',
  imports: [SbbPaginatorModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorBasicExample {}
