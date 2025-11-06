import { NgModule } from '@angular/core';

import { SbbFlipCard } from './flip-card/flip-card';
import { SbbFlipCardDetails } from './flip-card-details/flip-card-details';
import { SbbFlipCardSummary } from './flip-card-summary/flip-card-summary';

const SBB_FLIP_CARD_EXPORTED_DECLARATIONS = [SbbFlipCard, SbbFlipCardDetails, SbbFlipCardSummary];

@NgModule({
  imports: SBB_FLIP_CARD_EXPORTED_DECLARATIONS,
  exports: SBB_FLIP_CARD_EXPORTED_DECLARATIONS,
})
export class SbbFlipCardModule {}
