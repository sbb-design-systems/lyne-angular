import { NgModule } from '@angular/core';

import { SbbTooltip } from './tooltip';
import { SbbTooltipDirective } from './tooltip-directives';

const EXPORTED_DECLARATIONS = [SbbTooltip, SbbTooltipDirective];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbTooltipModule {}
