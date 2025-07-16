import type { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { type ComponentRef, type EmbeddedViewRef } from '@angular/core';
import type { Observable } from 'rxjs';

import type { SbbOverlayState } from './overlay-ref';

export abstract class SbbOverlayContainerBase<I = unknown, R = unknown> {
  abstract open(): void;
  abstract attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
  abstract attachTemplatePortal<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T>;
  abstract close(result?: unknown, target?: HTMLElement): void;
  abstract getState(): SbbOverlayState;
  abstract elementInstance: I;
  abstract beforeOpened: Observable<R>;
  abstract beforeClosed: Observable<R>;
  abstract opened: Observable<R>;
  abstract closed: Observable<R>;
}
