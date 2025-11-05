import { Directive, ElementRef, Input, NgZone, inject, numberAttribute } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute, internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbTooltipElement } from '@sbb-esta/lyne-elements/tooltip.js';
import { NEVER, fromEvent } from 'rxjs';
import '@sbb-esta/lyne-elements/tooltip.js';

/**
 * It displays text content within a tooltip.
 *
 * @slot  - Use the unnamed slot to add the text into the tooltip.
 * @cssprop [--sbb-overlay-position-area=block-end] - The primary position for the tooltip.
 * @cssprop [--sbb-overlay-position-try-fallbacks=block-end span-inline-end, block-end span-inline-start, block-start, block-start span-inline-end, block-start span-inline-start] - The list of fallback positions, separated by ',', for the tooltip
 * @cssprop [--sbb-tooltip-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order, the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
@Directive({
  selector: 'sbb-tooltip',
  exportAs: 'sbbTooltip',
})
export class SbbTooltip {
  #element: ElementRef<SbbTooltipElement> = inject(ElementRef<SbbTooltipElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * The element that will trigger the tooltip overlay.
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
   * Open the tooltip after a given delay in milliseconds.
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
   * Close the tooltip after a given delay in milliseconds.
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
   * Automatically close the tooltip after it has been open by long press.
   * Global configuration is used as default, if not set.
   */
  @Input({ transform: numberAttribute })
  public set longPressCloseDelay(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.longPressCloseDelay = value));
  }
  public get longPressCloseDelay(): number {
    return this.#element.nativeElement.longPressCloseDelay;
  }

  /**
   * Whether the component is disabled.
   */
  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }

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
   * Emits whenever the component begins the closing transition. Can be canceled.
   */
  public beforeCloseOutput = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeclose'),
    { alias: 'beforeClose' },
  );

  protected _closeOutput = outputFromObservable<Event>(NEVER, { alias: 'close' });
  /**
   * Emits whenever the component is closed.
   */
  public closeOutput = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'close'),
  );

  /**
   * Whether the element is open.
   */
  public get isOpen(): boolean {
    return this.#element.nativeElement.isOpen;
  }

  /**
   * Opens the component.
   */
  public open(): void {
    return this.#element.nativeElement.open();
  }

  /**
   * Closes the component.
   */
  public close(): void {
    return this.#element.nativeElement.close();
  }

  /**
   * The method which is called on escape key press. Defaults to calling close()
   */
  public escapeStrategy(): void {
    return this.#element.nativeElement.escapeStrategy();
  }
}
