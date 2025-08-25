import { NgModule } from '@angular/core';

import { SbbTab } from './tab/tab';
import { SbbTabGroup } from './tab-group/tab-group';
import { SbbTabLabel } from './tab-label/tab-label';

const EXPORTED_DECLARATIONS = [SbbTab, SbbTabGroup, SbbTabLabel];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbTabsModule {}
