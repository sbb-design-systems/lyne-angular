import { NgModule } from '@angular/core';

import { SbbCard } from './card/card';
import { SbbCardBadge } from './card-badge/card-badge';
import { SbbCardButton } from './card-button/card-button';
import { SbbCardLink } from './card-link/card-link';

const SBB_CARD_EXPORTED_DECLARATIONS = [SbbCard, SbbCardBadge, SbbCardButton, SbbCardLink];

@NgModule({
  imports: SBB_CARD_EXPORTED_DECLARATIONS,
  exports: SBB_CARD_EXPORTED_DECLARATIONS,
})
export class SbbCardModule {}
