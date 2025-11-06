import { NgModule } from '@angular/core';

import { SbbAlert } from './alert/alert';
import { SbbAlertGroup } from './alert-group/alert-group';

const SBB_ALERT_EXPORTED_DECLARATIONS = [SbbAlert, SbbAlertGroup];

@NgModule({
  imports: SBB_ALERT_EXPORTED_DECLARATIONS,
  exports: SBB_ALERT_EXPORTED_DECLARATIONS,
})
export class SbbAlertModule {}
