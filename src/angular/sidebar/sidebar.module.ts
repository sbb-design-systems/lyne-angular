import { NgModule } from '@angular/core';
import { SbbFocusInitialDirective } from '@sbb-esta/lyne-angular/core/overlay';

import { SbbSidebar } from './sidebar/sidebar';
import { SbbSidebarCloseButton } from './sidebar-close-button/sidebar-close-button';
import { SbbSidebarContainer } from './sidebar-container/sidebar-container';
import { SbbSidebarContent } from './sidebar-content/sidebar-content';
import { SbbSidebarTitle } from './sidebar-title/sidebar-title';

const SBB_SIDEBAR_EXPORTED_DECLARATIONS = [
  SbbSidebar,
  SbbSidebarCloseButton,
  SbbSidebarContainer,
  SbbSidebarContent,
  SbbSidebarTitle,
  SbbFocusInitialDirective,
];

@NgModule({
  imports: SBB_SIDEBAR_EXPORTED_DECLARATIONS,
  exports: SBB_SIDEBAR_EXPORTED_DECLARATIONS,
})
export class SbbSidebarModule {}
