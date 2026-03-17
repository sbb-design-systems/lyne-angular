import { NgModule } from '@angular/core';

import { SbbJourneyHeader } from './journey-header';

const SBB_JOURNEY_HEADER_EXPORTED_DECLARATIONS = [SbbJourneyHeader];

@NgModule({
  imports: SBB_JOURNEY_HEADER_EXPORTED_DECLARATIONS,
  exports: SBB_JOURNEY_HEADER_EXPORTED_DECLARATIONS,
})
export class SbbJourneyHeaderModule {}
