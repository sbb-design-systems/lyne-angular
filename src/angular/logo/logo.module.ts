import { NgModule } from '@angular/core';

import { SbbLogo } from './logo';

const SBB_LOGO_EXPORTED_DECLARATIONS = [SbbLogo];

@NgModule({
  imports: SBB_LOGO_EXPORTED_DECLARATIONS,
  exports: SBB_LOGO_EXPORTED_DECLARATIONS,
})
export class SbbLogoModule {}
