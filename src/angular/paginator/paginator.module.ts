import { NgModule } from '@angular/core';

import { SbbCompactPaginator } from './compact-paginator/compact-paginator';
import { SbbPaginator } from './paginator/paginator';

const SBB_PAGINATOR_EXPORTED_DECLARATIONS = [SbbPaginator, SbbCompactPaginator];

@NgModule({
  imports: SBB_PAGINATOR_EXPORTED_DECLARATIONS,
  exports: SBB_PAGINATOR_EXPORTED_DECLARATIONS,
})
export class SbbPaginatorModule {}
