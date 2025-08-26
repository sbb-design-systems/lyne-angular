import { SbbExpansionPanelModule } from '@sbb-esta/lyne-angular/expansion-panel';

import { SbbAccordion } from './accordion';

export const SbbAccordionModule = [SbbAccordion, SbbExpansionPanelModule] as const;
