import { NgModule } from '@angular/core';

import { SbbLogo } from './logo/logo';
import { SbbLogoCargo } from './logo-cargo/logo-cargo';
import { SbbLogoCargoInternational } from './logo-cargo-international/logo-cargo-international';
import { SbbLogoElvetino } from './logo-elvetino/logo-elvetino';

const SBB_LOGO_EXPORTED_DECLARATIONS = [
  SbbLogo,
  SbbLogoCargo,
  SbbLogoCargoInternational,
  SbbLogoElvetino,
];

@NgModule({
  imports: SBB_LOGO_EXPORTED_DECLARATIONS,
  exports: SBB_LOGO_EXPORTED_DECLARATIONS,
})
export class SbbLogoModule {}
