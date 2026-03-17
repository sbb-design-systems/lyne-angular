import { NgModule } from '@angular/core';

import { SbbLinkList } from './link-list';

const SBB_LINK_LIST_EXPORTED_DECLARATIONS = [SbbLinkList];

@NgModule({
  imports: SBB_LINK_LIST_EXPORTED_DECLARATIONS,
  exports: SBB_LINK_LIST_EXPORTED_DECLARATIONS,
})
export class SbbLinkListModule {}
