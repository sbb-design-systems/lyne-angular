import { NgModule } from '@angular/core';

import { SbbFlipCard } from './flip-card/flip-card';
import { SbbFlipCardDetails } from './flip-card-details/flip-card-details';
import { SbbFlipCardSummary } from './flip-card-summary/flip-card-summary';

const EXPORTED_DECLARATIONS = [SbbFlipCard, SbbFlipCardDetails, SbbFlipCardSummary];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbFlipCardModule {}
