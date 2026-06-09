import { SbbOverlayBaseConfig } from '@sbb-esta/lyne-angular/core';

import type { SbbToast } from './toast';
import type { SbbToastContainer } from './toast-container';

export class SbbToastConfig<
  C extends SbbToastContainer,
  I = SbbToast,
  D = unknown,
> extends SbbOverlayBaseConfig<C, I, D> {}
