import { NgModule } from '@angular/core';

import { SbbSignet } from './signet';

const SBB_SIGNET_EXPORTED_DECLARATIONS = [SbbSignet];

@NgModule({
  imports: SBB_SIGNET_EXPORTED_DECLARATIONS,
  exports: SBB_SIGNET_EXPORTED_DECLARATIONS,
})
export class SbbSignetModule {}
