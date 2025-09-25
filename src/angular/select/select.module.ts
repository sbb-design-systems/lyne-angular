import { NgModule } from '@angular/core';
import { SbbOptionModule } from '@sbb-esta/lyne-angular/option';

import { SbbSelect } from './select';

const EXPORTED_DECLARATIONS = [SbbSelect, SbbOptionModule];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbSelectModule {}
