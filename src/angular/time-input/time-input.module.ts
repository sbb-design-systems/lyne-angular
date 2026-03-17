import { NgModule } from '@angular/core';

import { SbbTimeInput } from './time-input';

const SBB_TIME_INPUT_EXPORTED_DECLARATIONS = [SbbTimeInput];

@NgModule({
  imports: SBB_TIME_INPUT_EXPORTED_DECLARATIONS,
  exports: SBB_TIME_INPUT_EXPORTED_DECLARATIONS,
})
export class SbbTimeInputModule {}
