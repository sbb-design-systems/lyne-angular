import { CdkPortalOutlet, type ComponentPortal, type TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  type ComponentRef,
  type EmbeddedViewRef,
  inject,
  ViewChild,
} from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import {
  SbbOverlayConfig,
  SbbOverlayContainerBase,
  SbbOverlayState,
} from '@sbb-esta/lyne-angular/core/overlay';
import type { Observable } from 'rxjs';

import { SbbOverlay } from './overlay';

/**
 * Container component for `SbbOverlay` components.
 */
@Component({
  // Selector should not attribute match as it will be created programmatically
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

  public override afterOpen: Observable<Event | undefined> = outputToObservable(
    this.elementInstance.openOutput,
  );

  public override afterClose: Observable<Event | undefined> = outputToObservable(
    this.elementInstance.closeOutput,
  );

  public override beforeClose: Observable<Event | undefined> = outputToObservable(
    this.elementInstance.beforeCloseOutput,
  );
}
