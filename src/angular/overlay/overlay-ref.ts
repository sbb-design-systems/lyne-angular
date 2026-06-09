import { SbbOverlayBaseRef } from '@sbb-esta/lyne-angular/core';
import type { SbbOverlayCloseEvent } from '@sbb-esta/lyne-elements/overlay.pure.js';

export class SbbOverlayRef<T = unknown, R = unknown> extends SbbOverlayBaseRef<
  T,
  SbbOverlayCloseEvent<R | null>
> {}
