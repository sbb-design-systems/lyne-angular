import { inject, Injectable } from '@angular/core';
import { SbbOverlayBaseService } from '@sbb-esta/lyne-angular/core/overlay';

import type { SbbDialog } from './dialog';
import { SbbDialogContainer } from './dialog-container';

@Injectable({ providedIn: 'root' })
export class SbbDialogService extends SbbOverlayBaseService<SbbDialogContainer, SbbDialog> {
  protected parentService = inject(SbbDialogService, { optional: true, skipSelf: true });
  protected containerType = SbbDialogContainer;
}
