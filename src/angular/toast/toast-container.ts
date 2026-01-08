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
import type { Observable } from 'rxjs';

import { SbbToast } from './toast';

@Component({
  // Selector should not attribute match as it will be created programmatically
  selector: 'sbb-toast[sbb-toast-container]',
  imports: [CdkPortalOutlet],
  hostDirectives: [
    {
      directive: SbbToast,
    },
  ],
  host: {
    '[attr.id]': '_config.id || null',
  },
  template: `<ng-template cdkPortalOutlet></ng-template>`,
})
export class SbbToastContainer extends SbbOverlayContainerBase<SbbToast> {
  readonly _config: SbbOverlayConfig<SbbToastContainer, SbbToast, unknown> =
    inject(SbbOverlayConfig, { optional: true }) || {};

  /** The portal outlet inside of this container into which the dialog content will be loaded. */
  public elementInstance = inject(SbbToast);

  public readonly _portalOutlet = viewChild.required(CdkPortalOutlet);

  public override open(): void {
    this.elementInstance.open();
  }

  public override close(): void {
    this.elementInstance.close();
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

  public override afterOpened: Observable<Event | undefined> = outputToObservable(
    this.elementInstance.openOutput,
  );

  public override afterClosed: Observable<Event | undefined> = outputToObservable(
    this.elementInstance.closeOutput,
  );

  public override beforeClosed: Observable<Event | undefined> = outputToObservable(
    this.elementInstance.beforeCloseOutput,
  );

  public override afterOpen: Observable<Event | undefined> = this.afterOpened;
  public override afterClose: Observable<Event | undefined> = this.afterClosed;
  public override beforeClose: Observable<Event | undefined> = this.beforeClosed;
}
