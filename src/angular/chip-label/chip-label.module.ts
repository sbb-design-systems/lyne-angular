import { NgModule } from '@angular/core';

import { SbbChipLabel } from './chip-label';

const SBB_CHIP_LABEL_EXPORTED_DECLARATIONS = [SbbChipLabel];

@NgModule({
  imports: SBB_CHIP_LABEL_EXPORTED_DECLARATIONS,
  exports: SBB_CHIP_LABEL_EXPORTED_DECLARATIONS,
})
export class SbbChipLabelModule {}
