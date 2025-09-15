import { NgModule } from '@angular/core';

import { SbbMenu } from './menu/menu';
import { SbbMenuButton } from './menu-button/menu-button';
import { SbbMenuLink } from './menu-link/menu-link';

const EXPORTED_DECLARATIONS = [SbbMenu, SbbMenuButton, SbbMenuLink];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbMenuModule {}
