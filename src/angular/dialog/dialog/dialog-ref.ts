import { SbbOverlayBaseRef } from '@sbb-esta/lyne-angular/core/overlay';
import type { SbbDialogCloseEvent } from '@sbb-esta/lyne-elements/dialog.js';

export class SbbDialogRef<T = unknown, R = unknown> extends SbbOverlayBaseRef<
  T,
  SbbDialogCloseEvent<R | null>
> {}
