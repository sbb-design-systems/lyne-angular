import { NgModule } from '@angular/core';

import { SbbScreenReaderOnly } from './screen-reader-only';

const SBB_SCREEN_READER_ONLY_EXPORTED_DECLARATIONS = [SbbScreenReaderOnly];

@NgModule({
  imports: SBB_SCREEN_READER_ONLY_EXPORTED_DECLARATIONS,
  exports: SBB_SCREEN_READER_ONLY_EXPORTED_DECLARATIONS,
})
export class SbbScreenReaderOnlyModule {}
