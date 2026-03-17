import { NgModule } from '@angular/core';

import { SbbMessage } from './message';

const SBB_MESSAGE_EXPORTED_DECLARATIONS = [SbbMessage];

@NgModule({
  imports: SBB_MESSAGE_EXPORTED_DECLARATIONS,
  exports: SBB_MESSAGE_EXPORTED_DECLARATIONS,
})
export class SbbMessageModule {}
