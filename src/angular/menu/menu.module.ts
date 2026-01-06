import { NgModule } from '@angular/core';
import { SbbFocusInitialDirective } from '@sbb-esta/lyne-angular/core/overlay';

import { SbbMenu } from './menu/menu';
import { SbbMenuButton } from './menu-button/menu-button';
import { SbbMenuLink } from './menu-link/menu-link';

const SBB_MENU_EXPORTED_DECLARATIONS = [
  SbbMenu,
  SbbMenuButton,
  SbbMenuLink,
  SbbFocusInitialDirective,
];

@NgModule({
  imports: SBB_MENU_EXPORTED_DECLARATIONS,
  exports: SBB_MENU_EXPORTED_DECLARATIONS,
})
export class SbbMenuModule {}
