import { inject, Injectable } from '@angular/core';
import { SbbOverlayBaseService } from '@sbb-esta/lyne-angular/core/overlay';

import { type SbbToast } from './toast';
import { SbbToastContainer } from './toast-container';

@Injectable({ providedIn: 'root' })
export class SbbToastService extends SbbOverlayBaseService<SbbToastContainer, SbbToast> {
  protected parentService = inject(SbbToastService, { optional: true, skipSelf: true });
  protected containerType = SbbToastContainer;
}
