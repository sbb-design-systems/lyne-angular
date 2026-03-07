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
import type { SbbDialogCloseEvent } from '@sbb-esta/lyne-elements/dialog/dialog.js';
import type { Observable } from 'rxjs';

import { SbbDialog } from './dialog';

/**
 * Container component for `SbbDialog` components.
 */
@Component({
  // Selector should not attribute match as it will be created programmatically
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
  template: `<ng-template cdkPortalOutlet></ng-template>`,
})
export class SbbDialogContainer extends SbbOverlayContainerBase<SbbDialog> {
  readonly _config: SbbOverlayConfig<SbbDialogContainer, SbbDialog, unknown> =
    inject(SbbOverlayConfig, { optional: true }) || {};

  /** The portal outlet inside of this container into which the dialog content will be loaded. */
  public elementInstance = inject(SbbDialog)!;

  public readonly _portalOutlet = viewChild.required(CdkPortalOutlet);

  public override open(): void {
    this.elementInstance.open();
  }

  /** Closes the component. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public override close(result?: any): void;
  /** @deprecated */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public override close(result?: any, target?: HTMLElement): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public override close(result?: any, target?: HTMLElement): void {
    this.elementInstance.close(result, target);
  }

  /**
   * Attach a TemplatePortal as content to this dialog container.
   * @param portal Portal to be attached as the dialog content.
   */
  public override attachTemplatePortal<T>(portal: TemplatePortal<T>): EmbeddedViewRef<T> {
    return this._portalOutlet().attachTemplatePortal(portal);
  }

  /**
   * Attach a ComponentPortal as content to this dialog container.
   * @param portal Portal to be attached as the dialog content.
   */
  public override attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    return this._portalOutlet().attachComponentPortal(portal);
  }

  public override getState(): SbbOverlayState {
    return this.elementInstance.isOpen ? SbbOverlayState.opened : SbbOverlayState.closed;
  }

  public override afterOpened: Observable<Event> = outputToObservable(
    this.elementInstance.openOutput,
  );

  public override afterClosed: Observable<SbbDialogCloseEvent> = outputToObservable(
    this.elementInstance.closeOutput,
  );

  public override beforeClosed: Observable<SbbDialogCloseEvent> = outputToObservable(
    this.elementInstance.beforeCloseOutput,
  );

  public override afterOpen: Observable<Event> = this.afterOpened;
  public override afterClose: Observable<SbbDialogCloseEvent> = this.afterClosed;
  public override beforeClose: Observable<SbbDialogCloseEvent> = this.beforeClosed;
}
