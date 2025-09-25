import { NgModule } from '@angular/core';

import { SbbOptGroup } from './optgroup/optgroup';
import { SbbOption } from './option/option';
import { SbbOptionHint } from './option-hint/option-hint';

const EXPORTED_DECLARATIONS = [SbbOptGroup, SbbOption, SbbOptionHint];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbOptionModule {}
