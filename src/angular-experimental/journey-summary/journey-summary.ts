import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbTitleLevel } from '@sbb-esta/lyne-elements/title.js';
import type {
  InterfaceSbbJourneySummaryAttributes,
  SbbJourneySummaryElement,
} from '@sbb-esta/lyne-elements-experimental/journey-summary.js';

import '@sbb-esta/lyne-elements-experimental/journey-summary.js';

/**
 * It displays journey's information.
 *
 * @slot content - Use this slot to add `sbb-button`s or other interactive elements.
 */
@Directive({
  selector: 'sbb-journey-summary',
  exportAs: 'sbbJourneySummary',
})
export class SbbJourneySummary {
  #element: ElementRef<SbbJourneySummaryElement> = inject(ElementRef<SbbJourneySummaryElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * The trip prop
   */
  @Input()
  public set trip(value: InterfaceSbbJourneySummaryAttributes) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.trip = value));
  }
  public get trip(): InterfaceSbbJourneySummaryAttributes {
    return this.#element.nativeElement.trip;
  }

  /**
   * The tripBack prop
   */
  @Input()
  public set tripBack(value: InterfaceSbbJourneySummaryAttributes) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.tripBack = value));
  }
  public get tripBack(): InterfaceSbbJourneySummaryAttributes {
    return this.#element.nativeElement.tripBack;
  }

  /**
   * The RoundTrip prop. This prop controls if one or two arrows are displayed in the header.
   */
  @Input({ transform: booleanAttribute })
  public set roundTrip(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.roundTrip = value));
  }
  public get roundTrip(): boolean {
    return this.#element.nativeElement.roundTrip;
  }

  /**
   * Heading level of the journey header element (e.g. h1-h6).
   */
  @Input()
  public set headerLevel(value: SbbTitleLevel) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.headerLevel = value));
  }
  public get headerLevel(): SbbTitleLevel {
    return this.#element.nativeElement.headerLevel;
  }

  /**
   * Per default, the current location has a pulsating animation. You can
   * disable the animation with this property.
   */
  @Input({ transform: booleanAttribute })
  public set disableAnimation(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disableAnimation = value));
  }
  public get disableAnimation(): boolean {
    return this.#element.nativeElement.disableAnimation;
  }

  /**
   * The Footpath attribute for rendering different icons
   * true: render a11y-icon
   * false: render walk-icon
   * default: render walk-icon
   */
  @Input({ transform: booleanAttribute })
  public set a11yFootpath(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.a11yFootpath = value));
  }
  public get a11yFootpath(): boolean {
    return this.#element.nativeElement.a11yFootpath;
  }

  /**
   * A configured date which acts as the current date instead of the real current date.
   * Only recommended for testing purposes.
   */
  @Input()
  public set now(value: Date) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.now = value));
  }
  public get now(): Date {
    return this.#element.nativeElement.now;
  }
}
