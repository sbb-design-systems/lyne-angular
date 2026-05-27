import {
  Directive,
  ElementRef,
  inject,
  Input,
  NgZone,
  numberAttribute,
  type OutputRef,
} from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute, internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbPopoverElement, SbbPopoverCloseEvent } from '@sbb-esta/lyne-elements/popover.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/popover.js';

/**
 * It displays contextual information within a popover.
 *
 * @slot  - Use the unnamed slot to add the `sbb-popover-close-button` and content into the popover.
 * @cssprop [--sbb-popover-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order, the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
@Directive({
  selector: 'sbb-popover',
  exportAs: 'sbbPopover',
})
export class SbbPopover {
  #element: ElementRef<SbbPopoverElement> = inject(ElementRef<SbbPopoverElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * The element that will trigger the popover overlay.
   *
   * For attribute usage, provide an id reference.
   */
  @Input()
  public set trigger(value: string | HTMLElement | null) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.trigger = value as HTMLElement | null),
    );
  }
  public get trigger(): HTMLElement | null {
    return this.#element.nativeElement.trigger;
  }

  /**
   * Whether the popover should be triggered on hover.
   */
  @Input({ transform: booleanAttribute })
  public set hoverTrigger(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hoverTrigger = value));
  }
  public get hoverTrigger(): boolean {
    return this.#element.nativeElement.hoverTrigger;
  }

  /**
   * Open the popover after a given delay in milliseconds.
   * Global configuration is used as default, if not set.
   */
  @Input({ transform: numberAttribute })
  public set openDelay(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.openDelay = value));
  }
  public get openDelay(): number {
    return this.#element.nativeElement.openDelay;
  }

  /**
   * Close the popover after a given delay in milliseconds.
   * Global configuration is used as default, if not set.
   */
  @Input({ transform: numberAttribute })
  public set closeDelay(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.closeDelay = value));
  }
  public get closeDelay(): number {
    return this.#element.nativeElement.closeDelay;
  }

  /**
   * Whether the element is open.
   */
  public get isOpen(): boolean {
    return this.#element.nativeElement.isOpen;
  }

  /**
   * Opens the popover on trigger click.
   */
  public open(): void {
    return this.#element.nativeElement.open();
  }

  /**
   * Closes the popover.
   */
  public close(): void {
    return this.#element.nativeElement.close();
  }

  /**
   * Emits whenever the component begins the closing transition. Can be canceled.
   */
  public beforeCloseOutput: OutputRef<SbbPopoverCloseEvent> = outputFromObservable(
    fromEvent<SbbPopoverCloseEvent>(this.#element.nativeElement, 'beforeclose'),
    { alias: 'beforeClose' },
  );

  protected _closeOutput: OutputRef<SbbPopoverCloseEvent> =
    outputFromObservable<SbbPopoverCloseEvent>(NEVER, {
      alias: 'close',
    });
  /**
   * Emits whenever the component is closed.
   */
  public closeOutput: OutputRef<SbbPopoverCloseEvent> = internalOutputFromObservable(
    fromEvent<SbbPopoverCloseEvent>(this.#element.nativeElement, 'close'),
  );

  /**
   * Emits whenever the component starts the opening transition. Can be canceled.
   */
  public beforeOpenOutput: OutputRef<Event> = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeopen'),
    { alias: 'beforeOpen' },
  );

  protected _openOutput: OutputRef<Event> = outputFromObservable<Event>(NEVER, { alias: 'open' });
  /**
   * Emits whenever the component is opened.
   */
  public openOutput: OutputRef<Event> = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'open'),
  );

  /**
   * The method which is called on escape key press. Defaults to calling close()
   */
  public escapeStrategy(): void {
    return this.#element.nativeElement.escapeStrategy();
  }
}
