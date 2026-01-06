import { NgModule } from '@angular/core';
import { SbbFocusInitial } from '@sbb-esta/lyne-angular/core/overlay';

import { SbbPopover } from './popover';
import { SbbPopoverClose } from './popover-close/popover-close';

const SBB_POPOVER_EXPORTED_DECLARATIONS = [SbbPopover, SbbPopoverClose, SbbFocusInitial];

@NgModule({
  imports: SBB_POPOVER_EXPORTED_DECLARATIONS,
  exports: SBB_POPOVER_EXPORTED_DECLARATIONS,
})
export class SbbPopoverModule {}
