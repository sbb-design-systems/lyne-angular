import { inject, Injectable, Injector } from '@angular/core';
import {
  _SbbOverlayBaseService,
  SBB_OVERLAY_DATA,
  SbbOverlayRef,
} from '@sbb-esta/lyne-angular/core/overlay';

import { type SbbToast } from './toast';
import { SbbToastContainer } from './toast-container';

@Injectable({ providedIn: 'any' })
export class SbbToastService extends _SbbOverlayBaseService<SbbToastContainer, SbbToast> {
  constructor() {
    const injector = inject(Injector);
    const parentDialog = inject(SbbToastService, { optional: true, skipSelf: true });

    super(injector, parentDialog, SbbToastContainer, SbbOverlayRef, SBB_OVERLAY_DATA);
  }
}
