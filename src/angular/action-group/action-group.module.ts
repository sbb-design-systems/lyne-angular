import { NgModule } from '@angular/core';

import { SbbActionGroup } from './action-group';

const SBB_ACTION_GROUP_EXPORTED_DECLARATIONS = [SbbActionGroup];

@NgModule({
  imports: SBB_ACTION_GROUP_EXPORTED_DECLARATIONS,
  exports: SBB_ACTION_GROUP_EXPORTED_DECLARATIONS,
})
export class SbbActionGroupModule {}
