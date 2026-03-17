import { NgModule } from '@angular/core';

import { SbbSkiplinkList } from './skiplink-list';

const SBB_SKIPLINK_LIST_EXPORTED_DECLARATIONS = [SbbSkiplinkList];

@NgModule({
  imports: SBB_SKIPLINK_LIST_EXPORTED_DECLARATIONS,
  exports: SBB_SKIPLINK_LIST_EXPORTED_DECLARATIONS,
})
export class SbbSkiplinkListModule {}
