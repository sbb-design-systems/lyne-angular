import { NgModule } from '@angular/core';

import { SbbChip } from './chip/chip';
import { SbbChipGroup } from './chip-group/chip-group';

const EXPORTED_DECLARATIONS = [SbbChip, SbbChipGroup];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbChipModule {}
