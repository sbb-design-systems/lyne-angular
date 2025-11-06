import { NgModule } from '@angular/core';

import { SbbToast } from './toast';
import { SbbToastContainer } from './toast-container';

const SBB_TOAST_EXPORTED_DECLARATIONS = [SbbToast, SbbToastContainer];

@NgModule({
  imports: SBB_TOAST_EXPORTED_DECLARATIONS,
  exports: SBB_TOAST_EXPORTED_DECLARATIONS,
})
export class SbbToastModule {}
