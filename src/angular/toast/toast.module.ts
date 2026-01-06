import { NgModule } from '@angular/core';

import { SbbToast } from './toast';
import { SbbToastCloseDirective } from './toast-close-directive/toast-close-directive';
import { SbbToastContainer } from './toast-container';

const SBB_TOAST_EXPORTED_DECLARATIONS = [SbbToast, SbbToastCloseDirective, SbbToastContainer];

@NgModule({
  imports: SBB_TOAST_EXPORTED_DECLARATIONS,
  exports: SBB_TOAST_EXPORTED_DECLARATIONS,
})
export class SbbToastModule {}
