import { Directive, ElementRef, Input, NgZone, inject, type OutputRef } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute, internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbDialogCloseEvent } from '@sbb-esta/lyne-elements/dialog.pure.js';
import { SbbEasterEggElement } from '@sbb-esta/lyne-elements-experimental/easter-egg.pure.js';
import { NEVER, fromEvent } from 'rxjs';

/**
 * A hidden easter egg dialog rendering a canvas-based Snake game.
 *
 * Use the inherited `open()`, `close()` methods and the `isOpen` getter
 * to control the dialog. The dialog can also be triggered from any element
 * via the inherited `trigger` id-reference attribute. Score is exposed via
 * the readonly `score` getter.
 *
 * @slot  - Use the unnamed slot to provide a `sbb-dialog-title`, `sbb-dialog-content` and an optional `sbb-dialog-actions`.
 * @cssprop [--sbb-dialog-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order, the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
@Directive({
  selector: 'sbb-easter-egg',
  exportAs: 'sbbEasterEgg',
})
export class SbbEasterEgg {
  static {
    SbbEasterEggElement.define();
  }

  #element: ElementRef<SbbEasterEggElement> = inject(ElementRef<SbbEasterEggElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Backdrop click action.
   */
  @Input()
  public set backdropAction(value: 'close' | 'none') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.backdropAction = value));
  }
  public get backdropAction(): 'close' | 'none' {
    return this.#element.nativeElement.backdropAction;
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
   * Backdrop density.
   */
  @Input()
  public set backdrop(value: 'opaque' | 'translucent') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.backdrop = value));
  }
  public get backdrop(): 'opaque' | 'translucent' {
    return this.#element.nativeElement.backdrop;
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
   * Whether to skip restoring focus to the previously-focused element when the overlay is closed.
   * Note that automatic focus restoration is an accessibility feature, and it is recommended that
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
   * Emits whenever the component begins the closing transition. Can be canceled.
   */
  public beforeCloseOutput: OutputRef<SbbDialogCloseEvent> = outputFromObservable(
    fromEvent<SbbDialogCloseEvent>(this.#element.nativeElement, 'beforeclose'),
    { alias: 'beforeClose' },
  );

  protected _closeOutput: OutputRef<SbbDialogCloseEvent> =
    outputFromObservable<SbbDialogCloseEvent>(NEVER, { alias: 'close' });

  /**
   * Emits whenever the component is closed.
   */
  public closeOutput: OutputRef<SbbDialogCloseEvent> = internalOutputFromObservable(
    fromEvent<SbbDialogCloseEvent>(this.#element.nativeElement, 'close'),
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
   * The current game score (number of food items eaten in the current run).
   */
  public get score(): number {
    return this.#element.nativeElement.score;
  }

  /**
   * The highest score reached in the current dialog session. Reset on close.
   */
  public get highScore(): number {
    return this.#element.nativeElement.highScore;
  }

  /**
   * Whether the element is open.
   */
  public get isOpen(): boolean {
    return this.#element.nativeElement.isOpen;
  }

  /**
   * Announce the accessibility label or dialog title for screen readers.
   */
  public announceTitle(): void {
    return this.#element.nativeElement.announceTitle();
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
  public close(result: any): void {
    return this.#element.nativeElement.close(result);
  }

  /**
   * The method which is called on escape key press. Defaults to calling close()
   */
  public escapeStrategy(): void {
    return this.#element.nativeElement.escapeStrategy();
  }
}
