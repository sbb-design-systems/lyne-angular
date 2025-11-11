import { Directive, ElementRef, inject, Input, NgZone, type OutputRef } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbFlipCardSummaryElement } from '@sbb-esta/lyne-elements/flip-card/flip-card-summary.js';
import type { SbbFlipCardElement } from '@sbb-esta/lyne-elements/flip-card/flip-card.js';
import type { SbbFlipCardDetailsElement } from '@sbb-esta/lyne-elements/flip-card.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/flip-card/flip-card.js';

@Directive({
  selector: 'sbb-flip-card',
  exportAs: 'sbbFlipCard',
})
export class SbbFlipCard {
  #element: ElementRef<SbbFlipCardElement> = inject(ElementRef<SbbFlipCardElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }

  public get summary(): SbbFlipCardSummaryElement | null {
    return this.#element.nativeElement.summary;
  }

  public get details(): SbbFlipCardDetailsElement | null {
    return this.#element.nativeElement.details;
  }

  public get isFlipped(): boolean {
    return this.#element.nativeElement.isFlipped;
  }

  public toggle(): void {
    return this.#element.nativeElement.toggle();
  }

  protected _flipOutput: OutputRef<Event> = outputFromObservable<Event>(NEVER, { alias: 'flip' });
  public flipOutput: OutputRef<Event> = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'flip'),
  );
}
