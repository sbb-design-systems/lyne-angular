import { NgModule } from '@angular/core';

import { SbbDivider } from './divider';

const SBB_DIVIDER_EXPORTED_DECLARATIONS = [SbbDivider];

@NgModule({
  imports: SBB_DIVIDER_EXPORTED_DECLARATIONS,
  exports: SBB_DIVIDER_EXPORTED_DECLARATIONS,
})
export class SbbDividerModule {}
