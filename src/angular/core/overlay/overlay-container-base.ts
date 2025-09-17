import type { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import type { ComponentRef, EmbeddedViewRef } from '@angular/core';
import { type Observable } from 'rxjs';

import type { SbbOverlayState } from './overlay-ref';

export abstract class SbbOverlayContainerBase<I = unknown> {
  abstract open(): void;
  abstract attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
  abstract attachTemplatePortal<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T>;
  abstract close(result?: unknown, target?: HTMLElement): void;
  abstract getState(): SbbOverlayState;
  abstract elementInstance: I;
  abstract beforeClose: Observable<Event | undefined>;
  abstract afterOpen: Observable<Event | undefined>;
  abstract afterClose: Observable<Event | undefined>;
}
