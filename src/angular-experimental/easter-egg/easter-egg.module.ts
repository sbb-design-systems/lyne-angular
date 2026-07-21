import { NgModule } from '@angular/core';

import { SbbEasterEgg } from './easter-egg';

const SBB_EASTER_EGG_EXPORTED_DECLARATIONS = [SbbEasterEgg];

@NgModule({
  imports: SBB_EASTER_EGG_EXPORTED_DECLARATIONS,
  exports: SBB_EASTER_EGG_EXPORTED_DECLARATIONS,
})
export class SbbEasterEggModule {}
