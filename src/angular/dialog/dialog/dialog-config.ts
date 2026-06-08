import { SbbOverlayBaseConfig } from '@sbb-esta/lyne-angular/core/overlay';

import type { SbbDialog } from './dialog';
import type { SbbDialogContainer } from './dialog-container';

export class SbbDialogConfig<
  C extends SbbDialogContainer,
  I = SbbDialog,
  D = unknown,
> extends SbbOverlayBaseConfig<C, I, D> {}
