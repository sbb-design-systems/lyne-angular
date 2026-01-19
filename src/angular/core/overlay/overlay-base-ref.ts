import type { DomPortalOutlet } from '@angular/cdk/portal';
import type { Location } from '@angular/common';
import type { ComponentRef } from '@angular/core';
import type { SubscriptionLike, Observable } from 'rxjs';
import { share, Subscription, take } from 'rxjs';

import type { SbbOverlayConfig } from './overlay-config';
import type { SbbOverlayContainerBase } from './overlay-container-base';

/** Possible states of the lifecycle of an overlay. */
export enum SbbOverlayState {
  opened,
  closed,
}

export class SbbOverlayBaseRef<T = unknown, C extends Event = Event> {
  /** The instance of component opened into the dialog. */
  componentInstance?: T;

  /**
   * `ComponentRef` of the component opened into the dialog. Will be
   * null when the dialog is opened using a `TemplateRef`.
   */
  readonly componentRef?: ComponentRef<T>;

  id?: string;

  #container: SbbOverlayContainerBase<unknown, C>;
  #afterOpened: Observable<Event>;
  #beforeClosed: Observable<C>;
  #afterClosed: Observable<C>;

  constructor(
    container: SbbOverlayContainerBase<unknown, C>,
    config: SbbOverlayConfig<SbbOverlayContainerBase<unknown, C>>,
    portalOutlet: DomPortalOutlet,
    // TODO: Make required @breaking-change
    location?: Location,
  ) {
    this.id = config.id;
    this.#container = container;
    this.#afterOpened = this.#container.afterOpened.pipe(take(1), share());
    this.#beforeClosed = this.#container.beforeClosed.pipe(take(1), share());
    this.#afterClosed = this.#container.afterClosed.pipe(take(1), share());

    let locationSubscription: SubscriptionLike = Subscription.EMPTY;

    // As closeOnNavigation defaults to true, we check for null or undefined
    if ((config.closeOnNavigation == null || config.closeOnNavigation) && location) {
      locationSubscription = location.subscribe(() => portalOutlet.dispose());
    }

    this.#afterClosed.subscribe({
      complete: () => {
        locationSubscription.unsubscribe();
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
  get afterOpened(): Observable<Event> {
    return this.#afterOpened;
  }

  /**
   * Gets an observable that is notified when the dialog is finished closing.
   */
  get afterClosed(): Observable<C> {
    return this.#afterClosed;
  }

  /**
   * Gets an observable that is notified when the dialog has started closing.
   */
  get beforeClosed(): Observable<C> {
    return this.#beforeClosed;
  }

  /**
   * Gets an observable that is notified when the dialog is finished opening.
   * @deprecated use afterOpened instead.
   */
  get afterOpen(): Observable<Event> {
    return this.#afterOpened;
  }

  /**
   * Gets an observable that is notified when the dialog is finished closing.
   * @deprecated use afterClosed instead.
   */
  get afterClose(): Observable<C> {
    return this.#afterClosed;
  }

  /**
   * Gets an observable that is notified when the dialog has started closing.
   * @deprecated use beforeClosed instead.
   */
  get beforeClose(): Observable<C> {
    return this.#beforeClosed;
  }
}
