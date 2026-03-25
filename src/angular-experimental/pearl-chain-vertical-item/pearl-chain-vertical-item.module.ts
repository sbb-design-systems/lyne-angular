import { NgModule } from '@angular/core';

import { SbbPearlChainVerticalItem } from './pearl-chain-vertical-item';

const SBB_PEARL_CHAIN_VERTICAL_ITEM_EXPORTED_DECLARATIONS = [SbbPearlChainVerticalItem];

@NgModule({
  imports: SBB_PEARL_CHAIN_VERTICAL_ITEM_EXPORTED_DECLARATIONS,
  exports: SBB_PEARL_CHAIN_VERTICAL_ITEM_EXPORTED_DECLARATIONS,
})
export class SbbPearlChainVerticalItemModule {}
