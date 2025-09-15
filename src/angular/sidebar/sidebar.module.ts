import { NgModule } from '@angular/core';

import { SbbIconSidebar } from './icon-sidebar/icon-sidebar';
import { SbbIconSidebarButton } from './icon-sidebar-button/icon-sidebar-button';
import { SbbIconSidebarContainer } from './icon-sidebar-container/icon-sidebar-container';
import { SbbIconSidebarContent } from './icon-sidebar-content/icon-sidebar-content';
import { SbbIconSidebarLink } from './icon-sidebar-link/icon-sidebar-link';
import { SbbSidebar } from './sidebar/sidebar';
import { SbbSidebarCloseButton } from './sidebar-close-button/sidebar-close-button';
import { SbbSidebarContainer } from './sidebar-container/sidebar-container';
import { SbbSidebarContent } from './sidebar-content/sidebar-content';
import { SbbSidebarTitle } from './sidebar-title/sidebar-title';

const EXPORTED_DECLARATIONS = [
  SbbIconSidebar,
  SbbIconSidebarButton,
  SbbIconSidebarContainer,
  SbbIconSidebarContent,
  SbbIconSidebarLink,
  SbbSidebar,
  SbbSidebarCloseButton,
  SbbSidebarContainer,
  SbbSidebarContent,
  SbbSidebarTitle,
];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbSidebarModule {}
