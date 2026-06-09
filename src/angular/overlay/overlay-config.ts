import type { StaticProvider } from '@angular/core';
import { SbbOverlayBaseConfig, type SbbOverlayBaseRef } from '@sbb-esta/lyne-angular/core';

import type { SbbOverlay } from './overlay';
import type { SbbOverlayContainer } from './overlay-container';

export class SbbOverlayConfig<
  C extends SbbOverlayContainer,
  I = SbbOverlay,
  D = unknown,
> extends SbbOverlayBaseConfig<C, I, D> {
  /**
   * Providers that will be exposed to the contents of the dialog. Can also
   * be provided as a function in order to generate the providers lazily.
   */
  declare providers?:
    | StaticProvider[]
    | ((
        overlayRef: SbbOverlayBaseRef,
        config: SbbOverlayConfig<C, I, D>,
        container: C,
      ) => StaticProvider[]);
}
