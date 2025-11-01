import type { OverlayRef } from '@angular/cdk/overlay';
import type { ComponentRef } from '@angular/core';
import { share, take, type Observable } from 'rxjs';

import type { SbbOverlayConfig } from './overlay-config';
import type { SbbOverlayContainerBase } from './overlay-container-base';

/** Possible states of the lifecycle of an overlay. */
export enum SbbOverlayState {
  opened,
  closed,
}

export class SbbOverlayRef<T = unknown> {
  /** The instance of component opened into the dialog. */
  componentInstance?: T;

  /**
   * `ComponentRef` of the component opened into the dialog. Will be
   * null when the dialog is opened using a `TemplateRef`.
   */
  readonly componentRef?: ComponentRef<T>;

  id?: string;

  #container: SbbOverlayContainerBase;
  #afterOpen: Observable<Event | undefined>;
  #beforeClose: Observable<Event | undefined>;
  #afterClose: Observable<Event | undefined>;

  constructor(
    container: SbbOverlayContainerBase,
    overlayRef: OverlayRef,
    config: SbbOverlayConfig<SbbOverlayContainerBase>,
  ) {
    this.id = config.id;
    this.#container = container;
    this.#afterOpen = this.#container.afterOpen.pipe(take(1), share());
    this.#beforeClose = this.#container.beforeClose.pipe(take(1), share());
    this.#afterClose = this.#container.afterClose.pipe(take(1), share());

    this.#afterClose.subscribe({
      complete: () => {
        overlayRef.dispose();
      },
    });
  }

  /**
   * Close the dialog.
   * @param result Optional result to return to the dialog opener.
   */
  close(result?: unknown): void {
    this.#container.close(result);
  }

  getState(): SbbOverlayState {
    return this.#container.getState();
  }

  /**
   * Gets an observable that is notified when the dialog is finished opening.
   */
  get afterOpen(): Observable<Event | undefined> {
    return this.#afterOpen;
  }

  /**
   * Gets an observable that is notified when the dialog is finished closing.
   */
  get afterClose(): Observable<Event | undefined> {
    return this.#afterClose;
  }

  /**
   * Gets an observable that is notified when the dialog has started closing.
   */
  get beforeClose(): Observable<Event | undefined> {
    return this.#beforeClose;
  }
}
