import { CdkPortalOutlet, type ComponentPortal, type TemplatePortal } from '@angular/cdk/portal';
import {
  Component,
  type ComponentRef,
  effect,
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
import { Subject, type Observable } from 'rxjs';

import { SbbToast } from './toast';

@Component({
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
  template: ` <ng-template cdkPortalOutlet></ng-template> `,
})
export class SbbToastContainer extends SbbOverlayContainerBase<SbbToast> {
  readonly _config: SbbOverlayConfig<SbbToastContainer, SbbToast, unknown>;
  private _opened = new Subject<unknown>();
  private _closed = new Subject<unknown>();

  /** The portal outlet inside of this container into which the dialog content will be loaded. */
  elementInstance = inject(SbbToast);

  @ViewChild(CdkPortalOutlet, { static: true }) _portalOutlet!: CdkPortalOutlet;

  constructor() {
    super();

    this._config = inject(SbbOverlayConfig, { optional: true }) || {};
    effect(() => {
      this._opened.next(this.elementInstance.openSignal());
    });
    effect(() => {
      this._closed.next(this.elementInstance.closeSignal());
    });
  }

  override open(): void {
    this.elementInstance.open();
  }

  override close(): void {
    this.elementInstance.close();
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

  public override get opened(): Observable<unknown> {
    return this._opened;
  }

  public override get closed(): Observable<unknown> {
    return this._closed;
  }

  public override beforeClosed: Observable<unknown> = outputToObservable(
    this.elementInstance.beforeCloseSignal,
  );
}
