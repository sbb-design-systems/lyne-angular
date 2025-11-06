import { NgModule } from '@angular/core';

import { SbbHeader } from './header/header';
import { SbbHeaderButton } from './header-button/header-button';
import { SbbHeaderEnvironment } from './header-environment/header-environment';
import { SbbHeaderLink } from './header-link/header-link';

const SBB_HEADER_EXPORTED_DECLARATIONS = [
  SbbHeader,
  SbbHeaderButton,
  SbbHeaderEnvironment,
  SbbHeaderLink,
];

@NgModule({
  imports: SBB_HEADER_EXPORTED_DECLARATIONS,
  exports: SBB_HEADER_EXPORTED_DECLARATIONS,
})
export class SbbHeaderModule {}
