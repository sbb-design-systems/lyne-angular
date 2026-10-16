import { NgModule } from '@angular/core';

import { SbbPearlChain } from './pearl-chain/pearl-chain';
import { SbbPearlChainNode } from './pearl-chain-node/pearl-chain-node';

const SBB_PEARL_CHAIN_EXPORTED_DECLARATIONS = [SbbPearlChain, SbbPearlChainNode];

@NgModule({
  imports: SBB_PEARL_CHAIN_EXPORTED_DECLARATIONS,
  exports: SBB_PEARL_CHAIN_EXPORTED_DECLARATIONS,
})
export class SbbPearlChainModule {}
