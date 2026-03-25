import { NgModule } from '@angular/core';

import { SbbPearlChain } from './pearl-chain';

const SBB_PEARL_CHAIN_EXPORTED_DECLARATIONS = [SbbPearlChain];

@NgModule({
  imports: SBB_PEARL_CHAIN_EXPORTED_DECLARATIONS,
  exports: SBB_PEARL_CHAIN_EXPORTED_DECLARATIONS,
})
export class SbbPearlChainModule {}
