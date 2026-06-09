import type { StaticProvider } from '@angular/core';
import { SbbOverlayBaseConfig, type SbbOverlayBaseRef } from '@sbb-esta/lyne-angular/core';

import type { SbbDialog } from './dialog';
import type { SbbDialogContainer } from './dialog-container';

export class SbbDialogConfig<
  C extends SbbDialogContainer,
  I = SbbDialog,
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
        config: SbbDialogConfig<C, I, D>,
        container: C,
      ) => StaticProvider[]);
}
