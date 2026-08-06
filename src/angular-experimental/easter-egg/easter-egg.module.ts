import { NgModule } from '@angular/core';

import { SbbEasterEgg } from './easter-egg';
import { SbbEasterEggTrigger } from './easter-egg-trigger';

const SBB_EASTER_EGG_EXPORTED_DECLARATIONS = [SbbEasterEgg, SbbEasterEggTrigger];

@NgModule({
  imports: SBB_EASTER_EGG_EXPORTED_DECLARATIONS,
  exports: SBB_EASTER_EGG_EXPORTED_DECLARATIONS,
})
export class SbbEasterEggModule {}
