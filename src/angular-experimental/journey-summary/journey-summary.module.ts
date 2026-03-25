import { NgModule } from '@angular/core';

import { SbbJourneySummary } from './journey-summary';

const SBB_JOURNEY_SUMMARY_EXPORTED_DECLARATIONS = [SbbJourneySummary];

@NgModule({
  imports: SBB_JOURNEY_SUMMARY_EXPORTED_DECLARATIONS,
  exports: SBB_JOURNEY_SUMMARY_EXPORTED_DECLARATIONS,
})
export class SbbJourneySummaryModule {}
