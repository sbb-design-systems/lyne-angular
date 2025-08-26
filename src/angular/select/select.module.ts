import { SbbOptionModule } from '@sbb-esta/lyne-angular/option';

import { SbbSelect } from './select';

export const SbbSelectModule = [SbbSelect, SbbOptionModule] as const;
