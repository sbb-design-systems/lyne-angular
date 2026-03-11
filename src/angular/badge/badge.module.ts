import { NgModule } from '@angular/core';

import { SbbBadge } from './badge';

const SBB_BADGE_EXPORTED_DECLARATIONS = [SbbBadge];

@NgModule({
  imports: SBB_BADGE_EXPORTED_DECLARATIONS,
  exports: SBB_BADGE_EXPORTED_DECLARATIONS,
})
export class SbbBadgeModule {}
