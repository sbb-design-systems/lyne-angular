import { NgModule } from '@angular/core';

import { SbbIconSidebar } from './icon-sidebar/icon-sidebar';
import { SbbIconSidebarButton } from './icon-sidebar-button/icon-sidebar-button';
import { SbbIconSidebarContainer } from './icon-sidebar-container/icon-sidebar-container';
import { SbbIconSidebarContent } from './icon-sidebar-content/icon-sidebar-content';
import { SbbIconSidebarLink } from './icon-sidebar-link/icon-sidebar-link';

const SBB_ICON_SIDEBAR_EXPORTED_DECLARATIONS = [
  SbbIconSidebar,
  SbbIconSidebarButton,
  SbbIconSidebarContainer,
  SbbIconSidebarContent,
  SbbIconSidebarLink,
];

@NgModule({
  imports: SBB_ICON_SIDEBAR_EXPORTED_DECLARATIONS,
  exports: SBB_ICON_SIDEBAR_EXPORTED_DECLARATIONS,
})
export class SbbSidebarModule {}

export { SbbSidebarModule as SbbIconSidebarModule };
