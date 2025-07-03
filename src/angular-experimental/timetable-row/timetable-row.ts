import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { ITripItem } from '@sbb-esta/lyne-elements-experimental/core/timetable.js';
import type {
  Boarding,
  Price,
  SbbTimetableRowElement,
} from '@sbb-esta/lyne-elements-experimental/timetable-row.js';

import '@sbb-esta/lyne-elements-experimental/timetable-row.js';

@Directive({
  selector: 'sbb-timetable-row',
  exportAs: 'sbbTimetableRow',
})
export class SbbTimetableRow {
  #element: ElementRef<SbbTimetableRowElement> = inject(ElementRef<SbbTimetableRowElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set trip(value: ITripItem) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.trip = value));
  }
  public get trip(): ITripItem {
    return this.#element.nativeElement.trip;
  }

  @Input()
  public set price(value: Price) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.price = value));
  }
  public get price(): Price {
    return this.#element.nativeElement.price;
  }

  @Input({ transform: booleanAttribute })
  public set disableAnimation(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disableAnimation = value));
  }
  public get disableAnimation(): boolean {
    return this.#element.nativeElement.disableAnimation;
  }

  @Input()
  public set boarding(value: Boarding) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.boarding = value));
  }
  public get boarding(): Boarding {
    return this.#element.nativeElement.boarding;
  }

  @Input({ transform: booleanAttribute })
  public set loadingTrip(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.loadingTrip = value));
  }
  public get loadingTrip(): boolean {
    return this.#element.nativeElement.loadingTrip;
  }

  @Input({ transform: booleanAttribute })
  public set a11yFootpath(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.a11yFootpath = value));
  }
  public get a11yFootpath(): boolean {
    return this.#element.nativeElement.a11yFootpath;
  }

  @Input({ transform: booleanAttribute })
  public set loadingPrice(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.loadingPrice = value));
  }
  public get loadingPrice(): boolean {
    return this.#element.nativeElement.loadingPrice;
  }

  @Input()
  public set cardActionLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.cardActionLabel = value));
  }
  public get cardActionLabel(): string {
    return this.#element.nativeElement.cardActionLabel;
  }

  @Input({ transform: booleanAttribute })
  public set accessibilityExpanded(value: boolean) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityExpanded = value),
    );
  }
  public get accessibilityExpanded(): boolean {
    return this.#element.nativeElement.accessibilityExpanded;
  }

  @Input({ transform: booleanAttribute })
  public set active(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.active = value));
  }
  public get active(): boolean {
    return this.#element.nativeElement.active;
  }

  @Input()
  public set now(value: Date) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.now = value));
  }
  public get now(): Date {
    return this.#element.nativeElement.now;
  }
}
