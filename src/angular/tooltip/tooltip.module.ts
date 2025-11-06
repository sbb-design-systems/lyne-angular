import { NgModule } from '@angular/core';

import { SbbTooltip } from './tooltip';
import { SbbTooltipDirective } from './tooltip-directives';

const SBB_TOOLTIP_EXPORTED_DECLARATIONS = [SbbTooltip, SbbTooltipDirective];

@NgModule({
  imports: SBB_TOOLTIP_EXPORTED_DECLARATIONS,
  exports: SBB_TOOLTIP_EXPORTED_DECLARATIONS,
})
export class SbbTooltipModule {}
