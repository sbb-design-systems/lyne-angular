import { NgModule } from '@angular/core';

import { SbbChip } from './chip/chip';
import { SbbChipGroup } from './chip-group/chip-group';

const SBB_CHIP_EXPORTED_DECLARATIONS = [SbbChip, SbbChipGroup];

@NgModule({
  imports: SBB_CHIP_EXPORTED_DECLARATIONS,
  exports: SBB_CHIP_EXPORTED_DECLARATIONS,
})
export class SbbChipModule {}
