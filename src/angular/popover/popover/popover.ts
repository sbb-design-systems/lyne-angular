import { Directive, ElementRef, inject, Input, NgZone, numberAttribute } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute, internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbPopoverElement } from '@sbb-esta/lyne-elements/popover/popover.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/popover/popover.js';

/**
 * It displays contextual information within a popover.
 *
 * @slot  - Use the unnamed slot to add content into the popover.
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
   * Whether the close button should be hidden.
   */
  @Input({ transform: booleanAttribute })
  public set hideCloseButton(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hideCloseButton = value));
  }
  public get hideCloseButton(): boolean {
    return this.#element.nativeElement.hideCloseButton;
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
   * This will be forwarded as aria-label to the close button element.
   */
  @Input()
  public set accessibilityCloseLabel(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityCloseLabel = value),
    );
  }
  public get accessibilityCloseLabel(): string {
    return this.#element.nativeElement.accessibilityCloseLabel;
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
  public close(target: HTMLElement): void {
    return this.#element.nativeElement.close(target);
  }

  /**
   * Emits whenever the component begins the closing transition. Can be canceled.
   */
  public beforeCloseOutput = outputFromObservable(
    fromEvent<CustomEvent<{ closeTarget: HTMLElement | null }>>(
      this.#element.nativeElement,
      'beforeclose',
    ),
    { alias: 'beforeClose' },
  );

  protected _closeOutput = outputFromObservable<CustomEvent<{ closeTarget: HTMLElement | null }>>(
    NEVER,
    { alias: 'close' },
  );
  /**
   * Emits whenever the component is closed.
   */
  public closeOutput = internalOutputFromObservable(
    fromEvent<CustomEvent<{ closeTarget: HTMLElement | null }>>(
      this.#element.nativeElement,
      'close',
    ),
  );

  /**
   * Emits whenever the component starts the opening transition. Can be canceled.
   */
  public beforeOpenOutput = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeopen'),
    { alias: 'beforeOpen' },
  );

  protected _openOutput = outputFromObservable<Event>(NEVER, { alias: 'open' });
  /**
   * Emits whenever the component is opened.
   */
  public openOutput = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'open'),
  );

  /**
   * The method which is called on escape key press. Defaults to calling close()
   */
  public escapeStrategy(): void {
    return this.#element.nativeElement.escapeStrategy();
  }
}
