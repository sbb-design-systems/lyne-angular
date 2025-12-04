import { NgModule } from '@angular/core';

import { SbbPopover } from './popover';

const SBB_POPOVER_EXPORTED_DECLARATIONS = [SbbPopover];

@NgModule({
  imports: SBB_POPOVER_EXPORTED_DECLARATIONS,
  exports: SBB_POPOVER_EXPORTED_DECLARATIONS,
})
export class SbbPopoverModule {}
