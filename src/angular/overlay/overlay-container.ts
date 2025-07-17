import { CdkPortalOutlet, type ComponentPortal, type TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  type ComponentRef,
  type EmbeddedViewRef,
  inject,
  ViewChild,
} from '@angular/core';
import { outputToObservable, toObservable } from '@angular/core/rxjs-interop';
import {
  SbbOverlayConfig,
  SbbOverlayContainerBase,
  SbbOverlayState,
} from '@sbb-esta/lyne-angular/core/overlay';
import type { Observable } from 'rxjs';

import { SbbOverlay } from './overlay';

@Component({
  selector: 'sbb-overlay[sbb-overlay-container]',
  imports: [CdkPortalOutlet],
  hostDirectives: [
    {
      directive: SbbOverlay,
    },
  ],
  host: {
    '[attr.id]': '_config.id || null',
  },
  template: ` <ng-template cdkPortalOutlet></ng-template> `,
})
export class SbbOverlayContainer extends SbbOverlayContainerBase<SbbOverlay> {
  readonly _config: SbbOverlayConfig<SbbOverlayContainer, SbbOverlay, unknown>;

  /** The portal outlet inside of this container into which the dialog content will be loaded. */
  elementInstance = inject(SbbOverlay);

  @ViewChild(CdkPortalOutlet, { static: true }) _portalOutlet!: CdkPortalOutlet;

  constructor() {
    super();

    this._config = inject(SbbOverlayConfig, { optional: true }) || {};
  }

  override open(): void {
    this.elementInstance.open();
  }

  override close(result?: unknown, target?: HTMLElement) {
    this.elementInstance.close(result, target);
  }

  override attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    return this._portalOutlet.attachComponentPortal(portal);
  }

  override attachTemplatePortal<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T> {
    return this._portalOutlet.attachTemplatePortal(portal);
  }

  override getState(): SbbOverlayState {
    return this.elementInstance.isOpen ? SbbOverlayState.opened : SbbOverlayState.closed;
  }

  override get beforeClosed(): Observable<unknown> {
    return outputToObservable(this.elementInstance.beforeCloseSignal);
  }

  override get beforeOpened(): Observable<unknown> {
    return outputToObservable(this.elementInstance.beforeOpenSignal);
  }

  override get closed(): Observable<unknown> {
    return toObservable(this.elementInstance.closeSignal);
  }

  override get opened(): Observable<unknown> {
    return toObservable(this.elementInstance.openSignal);
  }
}
