import { CdkPortalOutlet, type ComponentPortal, type TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  type ComponentRef,
  type EmbeddedViewRef,
  inject,
  viewChild,
} from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import {
  SbbOverlayConfig,
  SbbOverlayContainerBase,
  SbbOverlayState,
} from '@sbb-esta/lyne-angular/core/overlay';
import type { SbbOverlayCloseEvent } from '@sbb-esta/lyne-elements/overlay.js';
import type { Observable } from 'rxjs';

import { SbbOverlay } from './overlay';

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
  template: `<ng-template cdkPortalOutlet></ng-template>`,
})
export class SbbOverlayContainer extends SbbOverlayContainerBase<SbbOverlay> {
  readonly _config: SbbOverlayConfig<SbbOverlayContainer, SbbOverlay, unknown> =
    inject(SbbOverlayConfig, { optional: true }) || {};

  /** The portal outlet inside of this container into which the dialog content will be loaded. */
  public elementInstance = inject(SbbOverlay);

  public readonly _portalOutlet = viewChild.required(CdkPortalOutlet);

  public override open(): void {
    this.elementInstance.open();
  }
  /** Closes the component. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public close(result?: any): void;
  /** @deprecated */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public close(result?: any, target?: HTMLElement): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public close(result?: any, target?: HTMLElement): void {
    this.elementInstance.close(result, target);
  }

  public override attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    return this._portalOutlet().attachComponentPortal(portal);
  }

  public override attachTemplatePortal<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T> {
    return this._portalOutlet().attachTemplatePortal(portal);
  }

  public override getState(): SbbOverlayState {
    return this.elementInstance.isOpen ? SbbOverlayState.opened : SbbOverlayState.closed;
  }

  public override afterOpened: Observable<Event> = outputToObservable(
    this.elementInstance.openOutput,
  );

  public override afterClosed: Observable<SbbOverlayCloseEvent> = outputToObservable(
    this.elementInstance.closeOutput,
  );

  public override beforeClosed: Observable<SbbOverlayCloseEvent> = outputToObservable(
    this.elementInstance.beforeCloseOutput,
  );

  public override afterOpen: Observable<Event> = this.afterOpened;
  public override afterClose: Observable<SbbOverlayCloseEvent> = this.afterClosed;
  public override beforeClose: Observable<SbbOverlayCloseEvent> = this.beforeClosed;
}
