import { NgModule } from '@angular/core';

import { SbbOptGroup } from './optgroup/optgroup';
import { SbbOption } from './option/option';
import { SbbOptionHint } from './option-hint/option-hint';

const SBB_OPTION_EXPORTED_DECLARATIONS = [SbbOptGroup, SbbOption, SbbOptionHint];

@NgModule({
  imports: SBB_OPTION_EXPORTED_DECLARATIONS,
  exports: SBB_OPTION_EXPORTED_DECLARATIONS,
})
export class SbbOptionModule {}
