import { NgModule } from '@angular/core';
import { SbbFocusInitial } from '@sbb-esta/lyne-angular/core';

import { SbbPopover } from './popover/popover';
import { SbbPopoverClose } from './popover-close/popover-close';
import { SbbPopoverCloseButton } from './popover-close-button/popover-close-button';

const SBB_POPOVER_EXPORTED_DECLARATIONS = [
  SbbFocusInitial,
  SbbPopover,
  SbbPopoverClose,
  SbbPopoverCloseButton,
];

@NgModule({
  imports: SBB_POPOVER_EXPORTED_DECLARATIONS,
  exports: SBB_POPOVER_EXPORTED_DECLARATIONS,
})
export class SbbPopoverModule {}
