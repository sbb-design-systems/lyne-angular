import { SbbOverlayBaseRef } from '@sbb-esta/lyne-angular/core/overlay';
import type { SbbOverlayCloseEvent } from '@sbb-esta/lyne-elements/overlay.js';

export class SbbOverlayRef<T = unknown> extends SbbOverlayBaseRef<T, SbbOverlayCloseEvent> {}
