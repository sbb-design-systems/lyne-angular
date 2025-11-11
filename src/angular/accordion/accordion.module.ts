import { NgModule } from '@angular/core';
import { SbbExpansionPanelModule } from '@sbb-esta/lyne-angular/expansion-panel';

import { SbbAccordion } from './accordion';

const SBB_ACCORDION_EXPORTED_DECLARATIONS = [SbbAccordion, SbbExpansionPanelModule];

@NgModule({
  imports: SBB_ACCORDION_EXPORTED_DECLARATIONS,
  exports: SBB_ACCORDION_EXPORTED_DECLARATIONS,
})
export class SbbAccordionModule {}
