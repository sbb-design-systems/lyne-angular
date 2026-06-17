import { SbbOverlayBaseRef } from '@sbb-esta/lyne-angular/core';
import type { SbbDialogCloseEvent } from '@sbb-esta/lyne-elements/dialog.pure.js';

export class SbbDialogRef<T = unknown, R = unknown> extends SbbOverlayBaseRef<
  T,
  SbbDialogCloseEvent<R | null>
> {}
