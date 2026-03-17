import { NgModule } from '@angular/core';

import { SbbLinkListAnchor } from './link-list-anchor';

const SBB_LINK_LIST_ANCHOR_EXPORTED_DECLARATIONS = [SbbLinkListAnchor];

@NgModule({
  imports: SBB_LINK_LIST_ANCHOR_EXPORTED_DECLARATIONS,
  exports: SBB_LINK_LIST_ANCHOR_EXPORTED_DECLARATIONS,
})
export class SbbLinkListAnchorModule {}
