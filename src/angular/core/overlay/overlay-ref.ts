import type { DomPortalOutlet } from '@angular/cdk/portal';
import type { ComponentRef } from '@angular/core';
import { type Observable, share, take } from 'rxjs';

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
  #afterOpened: Observable<Event | undefined>;
  #beforeClosed: Observable<Event | undefined>;
  #afterClosed: Observable<Event | undefined>;

  constructor(
    container: SbbOverlayContainerBase,
    config: SbbOverlayConfig<SbbOverlayContainerBase>,
    portalOutlet: DomPortalOutlet,
  ) {
    this.id = config.id;
    this.#container = container;
    this.#afterOpened = this.#container.afterOpened.pipe(take(1), share());
    this.#beforeClosed = this.#container.beforeClosed.pipe(take(1), share());
    this.#afterClosed = this.#container.afterClosed.pipe(take(1), share());

    this.#afterClosed.subscribe({
      complete: () => {
        portalOutlet.dispose();
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
  get afterOpened(): Observable<Event | undefined> {
    return this.#afterOpened;
  }

  /**
   * Gets an observable that is notified when the dialog is finished closing.
   */
  get afterClosed(): Observable<Event | undefined> {
    return this.#afterClosed;
  }

  /**
   * Gets an observable that is notified when the dialog has started closing.
   */
  get beforeClosed(): Observable<Event | undefined> {
    return this.#beforeClosed;
  }

  /**
   * Gets an observable that is notified when the dialog is finished opening.
   * @deprecated use afterOpened instead.
   */
  get afterOpen(): Observable<Event | undefined> {
    return this.#afterOpened;
  }

  /**
   * Gets an observable that is notified when the dialog is finished closing.
   * @deprecated use afterClosed instead.
   */
  get afterClose(): Observable<Event | undefined> {
    return this.#afterClosed;
  }

  /**
   * Gets an observable that is notified when the dialog has started closing.
   * @deprecated use beforeClosed instead.
   */
  get beforeClose(): Observable<Event | undefined> {
    return this.#beforeClosed;
  }
}
