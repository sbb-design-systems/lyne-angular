import { NgModule } from '@angular/core';

import { SbbPopover } from './popover/popover';
import { SbbPopoverTrigger } from './popover-trigger/popover-trigger';

const EXPORTED_DECLARATIONS = [SbbPopover, SbbPopoverTrigger];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbPopoverModule {}
