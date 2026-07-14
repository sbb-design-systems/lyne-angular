import { NgModule } from '@angular/core';

import { SbbTooltip } from './tooltip';
import { SbbTooltipTrigger } from './tooltip-trigger';

const SBB_TOOLTIP_EXPORTED_DECLARATIONS = [SbbTooltip, SbbTooltipTrigger];

@NgModule({
  imports: SBB_TOOLTIP_EXPORTED_DECLARATIONS,
  exports: SBB_TOOLTIP_EXPORTED_DECLARATIONS,
})
export class SbbTooltipModule {}
