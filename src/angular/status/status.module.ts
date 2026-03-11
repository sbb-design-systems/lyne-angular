import { NgModule } from '@angular/core';

import { SbbStatus } from './status';

const SBB_STATUS_EXPORTED_DECLARATIONS = [SbbStatus];

@NgModule({
  imports: SBB_STATUS_EXPORTED_DECLARATIONS,
  exports: SBB_STATUS_EXPORTED_DECLARATIONS,
})
export class SbbStatusModule {}
