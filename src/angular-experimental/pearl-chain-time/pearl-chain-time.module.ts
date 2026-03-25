import { NgModule } from '@angular/core';

import { SbbPearlChainTime } from './pearl-chain-time';

const SBB_PEARL_CHAIN_TIME_EXPORTED_DECLARATIONS = [SbbPearlChainTime];

@NgModule({
  imports: SBB_PEARL_CHAIN_TIME_EXPORTED_DECLARATIONS,
  exports: SBB_PEARL_CHAIN_TIME_EXPORTED_DECLARATIONS,
})
export class SbbPearlChainTimeModule {}
