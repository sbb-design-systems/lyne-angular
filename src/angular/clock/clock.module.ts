import { NgModule } from '@angular/core';

import { SbbClock } from './clock';

const SBB_CLOCK_EXPORTED_DECLARATIONS = [SbbClock];

@NgModule({
  imports: SBB_CLOCK_EXPORTED_DECLARATIONS,
  exports: SBB_CLOCK_EXPORTED_DECLARATIONS,
})
export class SbbClockModule {}
