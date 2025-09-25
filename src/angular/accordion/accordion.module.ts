import { NgModule } from '@angular/core';
import { SbbExpansionPanelModule } from '@sbb-esta/lyne-angular/expansion-panel';

import { SbbAccordion } from './accordion';

const EXPORTED_DECLARATIONS = [SbbAccordion, SbbExpansionPanelModule];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbAccordionModule {}
