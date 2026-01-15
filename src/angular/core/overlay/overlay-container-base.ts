import type { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import type { ComponentRef, EmbeddedViewRef } from '@angular/core';
import { type Observable } from 'rxjs';

import type { SbbOverlayState } from './overlay-ref';

export abstract class SbbOverlayContainerBase<I = unknown> {
  abstract open(): void;
  abstract attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
  abstract attachTemplatePortal<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T>;
  abstract close(result?: unknown): void;
  abstract getState(): SbbOverlayState;
  abstract elementInstance: I;
  abstract beforeClosed: Observable<Event>;
  abstract afterOpened: Observable<Event>;
  abstract afterClosed: Observable<Event>;

  /**
   * @deprecated Use beforeClosed instead.
   */
  abstract beforeClose: Observable<Event>;

  /**
   * @deprecated Use after Opened instead.
   */
  abstract afterOpen: Observable<Event>;

  /**
   * @deprecated Use afterClosed instead.
   */
  abstract afterClose: Observable<Event>;
}
