import { Directive, ElementRef, inject, Input, NgZone, type OutputRef } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbFlipCardSummaryElement } from '@sbb-esta/lyne-elements/flip-card/flip-card-summary.js';
import type { SbbFlipCardElement } from '@sbb-esta/lyne-elements/flip-card/flip-card.js';
import type { SbbFlipCardDetailsElement } from '@sbb-esta/lyne-elements/flip-card.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/flip-card/flip-card.js';

/**
 * Displays an informative card that reveals more information upon being clicked.
 *
 * @slot  - Use the unnamed slot to add a `sbb-flip-card-summary` and a `sbb-flip-card-details` element.
 */
@Directive({
  selector: 'sbb-flip-card',
  exportAs: 'sbbFlipCard',
})
export class SbbFlipCard {
  #element: ElementRef<SbbFlipCardElement> = inject(ElementRef<SbbFlipCardElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * This will be forwarded as aria-label to the action in the non flipped state.
   * If not set, the textContent of the `sbb-flip-card-summary` is taken.
   */
  @Input()
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }

  /**
   * Returns the slotted sbb-flip-card-summary.
   */
  public get summary(): SbbFlipCardSummaryElement | null {
    return this.#element.nativeElement.summary;
  }

  /**
   * Returns the slotted sbb-flip-card-details.
   */
  public get details(): SbbFlipCardDetailsElement | null {
    return this.#element.nativeElement.details;
  }

  /**
   * Whether the flip card is flipped.
   */
  public get isFlipped(): boolean {
    return this.#element.nativeElement.isFlipped;
  }

  /**
   * Toggles the state of the sbb-flip-card.
   */
  public toggle(): void {
    return this.#element.nativeElement.toggle();
  }

  protected _flipOutput: OutputRef<Event> = outputFromObservable<Event>(NEVER, { alias: 'flip' });
  /**
   * Emits whenever the component is flipped.
   */
  public flipOutput: OutputRef<Event> = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'flip'),
  );
}
