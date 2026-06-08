import { SbbOverlayBaseConfig } from '@sbb-esta/lyne-angular/core/overlay';

import type { SbbOverlay } from './overlay';
import type { SbbOverlayContainer } from './overlay-container';

export class SbbOverlayConfig<
  C extends SbbOverlayContainer,
  I = SbbOverlay,
  D = unknown,
> extends SbbOverlayBaseConfig<C, I, D> {}
