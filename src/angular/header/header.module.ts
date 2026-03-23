import { NgModule } from '@angular/core';

import { SbbHeader } from './header/header';
import { SbbHeaderButton } from './header-button/header-button';
import { SbbHeaderEnvironment } from './header-environment/header-environment';
import { SbbHeaderLink } from './header-link/header-link';
import { SbbHeaderScrollOrigin } from './header-scroll-origin/header-scroll-origin';

const SBB_HEADER_EXPORTED_DECLARATIONS = [
  SbbHeader,
  SbbHeaderButton,
  SbbHeaderEnvironment,
  SbbHeaderLink,
  SbbHeaderScrollOrigin,
];

@NgModule({
  imports: SBB_HEADER_EXPORTED_DECLARATIONS,
  exports: SBB_HEADER_EXPORTED_DECLARATIONS,
})
export class SbbHeaderModule {}
