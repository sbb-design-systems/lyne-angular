import { NgModule } from '@angular/core';

import { SbbDateInput } from './date-input';

const SBB_DATE_INPUT_EXPORTED_DECLARATIONS = [SbbDateInput];

@NgModule({
  imports: SBB_DATE_INPUT_EXPORTED_DECLARATIONS,
  exports: SBB_DATE_INPUT_EXPORTED_DECLARATIONS,
})
export class SbbDateInputModule {}
