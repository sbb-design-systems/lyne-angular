import { NgModule } from '@angular/core';

import { SbbPearlChainLegacy } from './pearl-chain-legacy';

const SBB_PEARL_CHAIN_EXPORTED_DECLARATIONS = [SbbPearlChainLegacy];

@NgModule({
  imports: SBB_PEARL_CHAIN_EXPORTED_DECLARATIONS,
  exports: SBB_PEARL_CHAIN_EXPORTED_DECLARATIONS,
})
export class SbbPearlChainLegacyModule {}
