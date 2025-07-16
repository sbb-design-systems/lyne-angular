import type { ComponentRef } from '@angular/core';
import type { Observable } from 'rxjs';

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

  constructor(
    private _container: SbbOverlayContainerBase,
    private _config: SbbOverlayConfig<SbbOverlayContainerBase, unknown, unknown>,
  ) {
    this.id = this._config.id;
  }

  /**
   * Close the dialog.
   * @param dialogResult Optional result to return to the dialog opener.
   */
  close(result?: unknown, target?: HTMLElement): void {
    this._container.close(result, target);
  }

  getState(): SbbOverlayState {
    return this._container.getState();
  }

  /**
   * Gets an observable that is notified when the dialog is finished opening.
   */
  afterOpened(): Observable<unknown> {
    return this._container.opened;
  }

  /**
   * Gets an observable that is notified when the dialog is finished closing.
   */
  afterClosed(): Observable<unknown> {
    return this._container.closed;
  }

  /**
   * Gets an observable that is notified when the dialog has started closing.
   */
  beforeClosed(): Observable<unknown> {
    return this._container.beforeClosed;
  }

  /**
   * Gets an observable that is notified when the dialog has started opening.
   */
  beforeOpened(): Observable<unknown> {
    return this._container.beforeOpened;
  }
}
