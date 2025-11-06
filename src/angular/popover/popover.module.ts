import { NgModule } from '@angular/core';

import { SbbPopover } from './popover/popover';
import { SbbPopoverTrigger } from './popover-trigger/popover-trigger';

const SBB_POPOVER_EXPORTED_DECLARATIONS = [SbbPopover, SbbPopoverTrigger];

@NgModule({
  imports: SBB_POPOVER_EXPORTED_DECLARATIONS,
  exports: SBB_POPOVER_EXPORTED_DECLARATIONS,
})
export class SbbPopoverModule {}
