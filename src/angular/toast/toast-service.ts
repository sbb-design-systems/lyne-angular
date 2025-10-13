import { inject, Injectable, Injector } from '@angular/core';
import {
  SbbOverlayBaseService,
  SBB_OVERLAY_DATA,
  SbbOverlayRef,
} from '@sbb-esta/lyne-angular/core/overlay';

import { type SbbToast } from './toast';
import { SbbToastContainer } from './toast-container';

@Injectable({ providedIn: 'root' })
export class SbbToastService extends SbbOverlayBaseService<SbbToastContainer, SbbToast> {
  constructor() {
    const injector = inject(Injector);
    const parentToastService = inject(SbbToastService, { optional: true, skipSelf: true })!;

    super(injector, parentToastService, SbbToastContainer, SbbOverlayRef, SBB_OVERLAY_DATA);
  }
}
