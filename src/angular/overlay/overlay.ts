import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute, internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbOverlayCloseEventDetails } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbOverlayElement } from '@sbb-esta/lyne-elements/overlay.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/overlay.js';

/**
 * It displays an interactive overlay element.
 *
 * @slot  - Use the unnamed slot to provide a content for the overlay.
 * @cssprop [--sbb-overlay-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order, the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
@Directive({
  selector: 'sbb-overlay',
  exportAs: 'sbbOverlay',
})
export class SbbOverlay {
  #element: ElementRef<SbbOverlayElement> = inject(ElementRef<SbbOverlayElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Whether to allow the overlay content to stretch to full width.
   * By default, the content has the appropriate page size.
   */
  @Input({ transform: booleanAttribute })
  public set expanded(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.expanded = value));
  }
  public get expanded(): boolean {
    return this.#element.nativeElement.expanded;
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
   * Negative coloring variant flag.
   */
  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  /**
   * The element that will trigger the menu overlay.
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
   * This will be forwarded as aria-label to the relevant nested element to describe the purpose of the overlay.
   */
  @Input()
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }

  /**
   * Whether to skip restoring focus to the previously-focused element when the overlay is closed.
   * Note that automatic focus restoration is an accessibility feature and it is recommended that
   * you provide your own equivalent, if you decide to turn it off.
   */
  @Input({ transform: booleanAttribute })
  public set skipFocusRestoration(value: boolean) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.skipFocusRestoration = value),
    );
  }
  public get skipFocusRestoration(): boolean {
    return this.#element.nativeElement.skipFocusRestoration;
  }

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public close(result?: any, target?: HTMLElement): any {
    return this.#element.nativeElement.close(result, target);
  }

  /**
   * Emits whenever the component begins the closing transition. Can be canceled.
   */
  public beforeCloseOutput = outputFromObservable(
    fromEvent<CustomEvent<SbbOverlayCloseEventDetails>>(this.#element.nativeElement, 'beforeclose'),
    { alias: 'beforeClose' },
  );

  protected _closeOutput = outputFromObservable<CustomEvent<SbbOverlayCloseEventDetails>>(NEVER, {
    alias: 'close',
  });
  /**
   * Emits whenever the component is closed.
   */
  public closeOutput = internalOutputFromObservable(
    fromEvent<CustomEvent<SbbOverlayCloseEventDetails>>(this.#element.nativeElement, 'close'),
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
