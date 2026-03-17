import { NgModule } from '@angular/core';

import { SbbIcon } from './icon';

const SBB_ICON_EXPORTED_DECLARATIONS = [SbbIcon];

@NgModule({
  imports: SBB_ICON_EXPORTED_DECLARATIONS,
  exports: SBB_ICON_EXPORTED_DECLARATIONS,
})
export class SbbIconModule {}
