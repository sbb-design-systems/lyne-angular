import type { StaticProvider } from '@angular/core';
import type { SbbOverlayBaseRef } from '@sbb-esta/lyne-angular/core';
import { SbbOverlayBaseConfig } from '@sbb-esta/lyne-angular/core';

import type { SbbToast } from './toast';
import type { SbbToastContainer } from './toast-container';

export class SbbToastConfig<
  C extends SbbToastContainer,
  I = SbbToast,
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
        config: SbbToastConfig<C, I, D>,
        container: C,
      ) => StaticProvider[]);
}
