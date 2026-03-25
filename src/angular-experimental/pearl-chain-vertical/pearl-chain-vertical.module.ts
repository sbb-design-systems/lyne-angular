import { NgModule } from '@angular/core';

import { SbbPearlChainVertical } from './pearl-chain-vertical';

const SBB_PEARL_CHAIN_VERTICAL_EXPORTED_DECLARATIONS = [SbbPearlChainVertical];

@NgModule({
  imports: SBB_PEARL_CHAIN_VERTICAL_EXPORTED_DECLARATIONS,
  exports: SBB_PEARL_CHAIN_VERTICAL_EXPORTED_DECLARATIONS,
})
export class SbbPearlChainVerticalModule {}
