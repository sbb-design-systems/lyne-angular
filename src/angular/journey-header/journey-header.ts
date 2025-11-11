import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type {
  JourneyHeaderSize,
  SbbJourneyHeaderElement,
} from '@sbb-esta/lyne-elements/journey-header.js';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';

import '@sbb-esta/lyne-elements/journey-header.js';

/**
 * Combined with the `sbb-journey-summary`, it displays the journey's detail.
 */
@Directive({
  selector: 'sbb-journey-header',
  exportAs: 'sbbJourneyHeader',
})
export class SbbJourneyHeader {
  #element: ElementRef<SbbJourneyHeaderElement> = inject(ElementRef<SbbJourneyHeaderElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Origin location for the journey header.
   */
  @Input()
  public set origin(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.origin = value));
  }
  public get origin(): string {
    return this.#element.nativeElement.origin;
  }

  /**
   * Destination location for the journey header.
   */
  @Input()
  public set destination(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.destination = value));
  }
  public get destination(): string {
    return this.#element.nativeElement.destination;
  }

  /**
   * Whether the journey is a round trip. If so, the icon changes to a round-trip one.
   */
  @Input({ transform: booleanAttribute })
  public set roundTrip(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.roundTrip = value));
  }
  public get roundTrip(): boolean {
    return this.#element.nativeElement.roundTrip;
  }

  /**
   * Title level
   */
  @Input()
  public set level(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.level = value));
  }
  public get level(): SbbTitleLevel {
    return this.#element.nativeElement.level;
  }

  /**
   * Journey header size, either s, m or l.
   */
  @Input()
  public set size(value: JourneyHeaderSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): JourneyHeaderSize {
    return this.#element.nativeElement.size;
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
   * Visual level for the title.
   */
  @Input()
  public set visualLevel(value: SbbTitleLevel | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.visualLevel = value));
  }
  public get visualLevel(): SbbTitleLevel | null {
    return this.#element.nativeElement.visualLevel;
  }
}
