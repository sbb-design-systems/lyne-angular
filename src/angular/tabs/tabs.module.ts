import { NgModule } from '@angular/core';

import { SbbTab } from './tab/tab';
import { SbbTabContent } from './tab/tab-content';
import { SbbTabGroup } from './tab-group/tab-group';
import { SbbTabLabel } from './tab-label/tab-label';
import { SbbTabNavBar } from './tab-nav-bar/tab-nav-bar';

const SBB_TAB_EXPORTED_DECLARATIONS = [
  SbbTab,
  SbbTabContent,
  SbbTabGroup,
  SbbTabLabel,
  SbbTabNavBar,
];

@NgModule({
  imports: SBB_TAB_EXPORTED_DECLARATIONS,
  exports: SBB_TAB_EXPORTED_DECLARATIONS,
})
export class SbbTabsModule {}
