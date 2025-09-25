import { NgModule } from '@angular/core';

import { SbbAlert } from './alert/alert';
import { SbbAlertGroup } from './alert-group/alert-group';

const EXPORTED_DECLARATIONS = [SbbAlert, SbbAlertGroup];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbAlertModule {}
