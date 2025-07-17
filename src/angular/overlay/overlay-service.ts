import { inject, Injectable, Injector } from '@angular/core';
import {
  _SbbOverlayBaseService,
  SBB_OVERLAY_DATA,
  SbbOverlayRef,
} from '@sbb-esta/lyne-angular/core/overlay';

import { type SbbOverlay } from './overlay';
import { SbbOverlayContainer } from './overlay-container';

@Injectable({ providedIn: 'any' })
export class SbbOverlayService extends _SbbOverlayBaseService<SbbOverlayContainer, SbbOverlay> {
  constructor() {
    const injector = inject(Injector);
    const parentDialog = inject(SbbOverlayService, { optional: true, skipSelf: true });

    super(injector, parentDialog, SbbOverlayContainer, SbbOverlayRef, SBB_OVERLAY_DATA);
  }
}
