import { NgModule } from '@angular/core';

import { SbbTitle } from './title';

const SBB_TITLE_EXPORTED_DECLARATIONS = [SbbTitle];

@NgModule({
  imports: SBB_TITLE_EXPORTED_DECLARATIONS,
  exports: SBB_TITLE_EXPORTED_DECLARATIONS,
})
export class SbbTitleModule {}
