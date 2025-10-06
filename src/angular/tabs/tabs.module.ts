import { NgModule } from '@angular/core';

import { SbbTab } from './tab/tab';
import { SbbTabContent } from './tab/tab-content';
import { SbbTabGroup } from './tab-group/tab-group';
import { SbbTabLabel } from './tab-label/tab-label';

const EXPORTED_DECLARATIONS = [SbbTab, SbbTabContent, SbbTabGroup, SbbTabLabel];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbTabsModule {}
