/* eslint-disable @angular-eslint/directive-selector, @angular-eslint/directive-class-suffix */
import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type {
  JourneyHeaderSize,
  SbbJourneyHeaderElement,
} from '@sbb-esta/lyne-elements/journey-header.js';
import '@sbb-esta/lyne-elements/journey-header.js';
import { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';

@Directive({
  selector: 'sbb-journey-header',
  standalone: true,
})
export class SbbJourneyHeader {
  #element: ElementRef<SbbJourneyHeaderElement> = inject(ElementRef<SbbJourneyHeaderElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set origin(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.origin = value));
  }
  public get origin(): string {
    return this.#element.nativeElement.origin;
  }

  @Input()
  public set destination(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.destination = value));
  }
  public get destination(): string {
    return this.#element.nativeElement.destination;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'round-trip', transform: booleanAttribute })
  public set roundTrip(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.roundTrip = value));
  }
  public get roundTrip(): boolean {
    return this.#element.nativeElement.roundTrip;
  }

  @Input()
  public set level(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.level = value));
  }
  public get level(): SbbTitleLevel {
    return this.#element.nativeElement.level;
  }

  @Input()
  public set size(value: JourneyHeaderSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): JourneyHeaderSize {
    return this.#element.nativeElement.size;
  }

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }
}
