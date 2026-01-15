import type { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import type { ComponentRef, EmbeddedViewRef } from '@angular/core';
import { type Observable } from 'rxjs';

import type { SbbOverlayState } from './overlay-base-ref';

export abstract class SbbOverlayContainerBase<I = unknown, C extends Event = Event> {
  abstract open(): void;
  abstract attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
  abstract attachTemplatePortal<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T>;
  abstract close(result?: unknown): void;
  abstract getState(): SbbOverlayState;
  abstract elementInstance: I;
  abstract afterOpened: Observable<Event>;
  abstract beforeClosed: Observable<C>;
  abstract afterClosed: Observable<C>;

  /**
   * @deprecated Use after Opened instead.
   */
  abstract afterOpen: Observable<Event>;

  /**
   * @deprecated Use beforeClosed instead.
   */
  abstract beforeClose: Observable<C>;

  /**
   * @deprecated Use afterClosed instead.
   */
  abstract afterClose: Observable<C>;
}
