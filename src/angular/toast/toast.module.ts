import { NgModule } from '@angular/core';

import { SbbToast } from './toast';
import { SbbToastContainer } from './toast-container';

const EXPORTED_DECLARATIONS = [SbbToast, SbbToastContainer];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbToastModule {}
