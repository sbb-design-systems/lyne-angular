import { NgModule } from '@angular/core';

import { SbbNotification } from './notification';

const SBB_NOTIFICATION_EXPORTED_DECLARATIONS = [SbbNotification];

@NgModule({
  imports: SBB_NOTIFICATION_EXPORTED_DECLARATIONS,
  exports: SBB_NOTIFICATION_EXPORTED_DECLARATIONS,
})
export class SbbNotificationModule {}
