import { inject, Injectable, Injector } from '@angular/core';
import {
  SbbOverlayBaseService,
  SBB_OVERLAY_DATA,
  SbbOverlayRef,
} from '@sbb-esta/lyne-angular/core/overlay';

import { type SbbOverlay } from './overlay';
import { SbbOverlayContainer } from './overlay-container';

@Injectable({ providedIn: 'root' })
export class SbbOverlayService extends SbbOverlayBaseService<SbbOverlayContainer, SbbOverlay> {
  constructor() {
    const injector = inject(Injector);
    const parentOverlayService = inject(SbbOverlayService, { optional: true, skipSelf: true });

    super(injector, parentOverlayService, SbbOverlayContainer, SbbOverlayRef, SBB_OVERLAY_DATA);
  }
}
