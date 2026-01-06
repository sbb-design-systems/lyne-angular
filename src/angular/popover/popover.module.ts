import { NgModule } from '@angular/core';
import { SbbFocusInitialDirective } from '@sbb-esta/lyne-angular/core/overlay';

import { SbbPopover } from './popover';
import { SbbPopoverCloseDirective } from './popover-close-directive/popover-close-directive';

const SBB_POPOVER_EXPORTED_DECLARATIONS = [
  SbbPopover,
  SbbPopoverCloseDirective,
  SbbFocusInitialDirective,
];

@NgModule({
  imports: SBB_POPOVER_EXPORTED_DECLARATIONS,
  exports: SBB_POPOVER_EXPORTED_DECLARATIONS,
})
export class SbbPopoverModule {}
