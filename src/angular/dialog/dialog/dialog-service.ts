import { inject, Injectable, Injector } from '@angular/core';
import {
  _SbbOverlayBaseService,
  SBB_OVERLAY_DATA,
  SbbOverlayRef,
} from '@sbb-esta/lyne-angular/core/overlay';

import type { SbbDialog } from './dialog';
import { SbbDialogContainer } from './dialog-container';

@Injectable({ providedIn: 'root' })
export class SbbDialogService extends _SbbOverlayBaseService<SbbDialogContainer, SbbDialog> {
  constructor() {
    const injector = inject(Injector);
    const parentDialog = inject(SbbDialogService, { optional: true, skipSelf: true });

    super(injector, parentDialog, SbbDialogContainer, SbbOverlayRef, SBB_OVERLAY_DATA);
  }
}
