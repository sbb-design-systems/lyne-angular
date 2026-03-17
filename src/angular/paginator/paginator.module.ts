import { NgModule } from '@angular/core';
import { SbbCompactPaginator } from '@sbb-esta/lyne-angular/paginator/compact-paginator';
import { SbbPaginator } from '@sbb-esta/lyne-angular/paginator/paginator';

const SBB_PAGINATOR_EXPORTED_DECLARATIONS = [SbbPaginator, SbbCompactPaginator];

@NgModule({
  imports: SBB_PAGINATOR_EXPORTED_DECLARATIONS,
  exports: SBB_PAGINATOR_EXPORTED_DECLARATIONS,
})
export class SbbPaginatorModule {}
