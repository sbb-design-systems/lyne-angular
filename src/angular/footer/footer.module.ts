import { NgModule } from '@angular/core';

import { SbbFooter } from './footer';

const SBB_FOOTER_EXPORTED_DECLARATIONS = [SbbFooter];

@NgModule({
  imports: SBB_FOOTER_EXPORTED_DECLARATIONS,
  exports: SBB_FOOTER_EXPORTED_DECLARATIONS,
})
export class SbbFooterModule {}
