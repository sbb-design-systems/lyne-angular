import { inject, Injectable } from '@angular/core';
import { SbbOverlayBaseService } from '@sbb-esta/lyne-angular/core/overlay';

import { type SbbOverlay } from './overlay';
import { SbbOverlayContainer } from './overlay-container';

@Injectable({ providedIn: 'root' })
export class SbbOverlayService extends SbbOverlayBaseService<SbbOverlayContainer, SbbOverlay> {
  protected parentService = inject(SbbOverlayService, { optional: true, skipSelf: true });
  protected containerType = SbbOverlayContainer;
}
