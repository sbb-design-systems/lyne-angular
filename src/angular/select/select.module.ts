import { NgModule } from '@angular/core';
import { SbbOptionModule } from '@sbb-esta/lyne-angular/option';

import { SbbSelect } from './select';

const SBB_SELECT_EXPORTED_DECLARATIONS = [SbbSelect, SbbOptionModule];

@NgModule({
  imports: SBB_SELECT_EXPORTED_DECLARATIONS,
  exports: SBB_SELECT_EXPORTED_DECLARATIONS,
})
export class SbbSelectModule {}
