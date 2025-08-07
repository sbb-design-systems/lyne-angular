import { CdkPortalOutlet, type ComponentPortal, type TemplatePortal } from '@angular/cdk/portal';
import {
  type OnDestroy,
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
import { type Observable, Subject } from 'rxjs';

import { SbbDialog } from './dialog';

@Component({
  selector: 'sbb-dialog[sbb-dialog-container]',
  imports: [CdkPortalOutlet],
  hostDirectives: [
    {
      directive: SbbDialog,
    },
  ],
  host: {
    '[attr.id]': '_config.id || null',
  },
  template: ` <ng-template cdkPortalOutlet></ng-template> `,
})
export class SbbDialogContainer extends SbbOverlayContainerBase<SbbDialog> implements OnDestroy {
  readonly _config: SbbOverlayConfig<SbbDialogContainer, SbbDialog, unknown>;
  private _opened = new Subject<unknown>();
  private _closed = new Subject<unknown>();

  /** The portal outlet inside of this container into which the dialog content will be loaded. */
  elementInstance = inject(SbbDialog)!;

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

  ngOnDestroy(): void {
    this._opened.complete();
    this._closed.complete();
  }

  override open(): void {
    this.elementInstance.open();
  }

  override close(result?: unknown, target?: HTMLElement): void {
    this.elementInstance.close(result, target);
  }

  /**
   * Attach a TemplatePortal as content to this dialog container.
   * @param portal Portal to be attached as the dialog content.
   */
  override attachTemplatePortal<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T> {
    return this._portalOutlet.attachTemplatePortal(portal);
  }

  /**
   * Attach a ComponentPortal as content to this dialog container.
   * @param portal Portal to be attached as the dialog content.
   */
  override attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    return this._portalOutlet.attachComponentPortal(portal);
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
