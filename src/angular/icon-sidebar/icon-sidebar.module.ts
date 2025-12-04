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

/**
 * The module has been incorrectly named, so now there are two SbbSidebarModule;
 * for now an alias export is added, and it will be removed in the next iteration
 * together with the renaming of the module.
 * @deprecated
 */
export { SbbSidebarModule as SbbIconSidebarModule };
