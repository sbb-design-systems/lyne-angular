import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { ITripItem } from '@sbb-esta/lyne-elements-experimental/core/timetable.js';
import type {
  Boarding,
  Price,
  SbbTimetableRowElement,
} from '@sbb-esta/lyne-elements-experimental/timetable-row.js';

import '@sbb-esta/lyne-elements-experimental/timetable-row.js';

/**
 * It displays information about the trip, acting as a container for all the `sbb-timetable-*` components.
 */
@Directive({
  selector: 'sbb-timetable-row',
  exportAs: 'sbbTimetableRow',
})
export class SbbTimetableRow {
  #element: ElementRef<SbbTimetableRowElement> = inject(ElementRef<SbbTimetableRowElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * The trip Prop.
   */
  @Input()
  public set trip(value: ITripItem) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.trip = value));
  }
  public get trip(): ITripItem {
    return this.#element.nativeElement.trip;
  }

  /**
   * The price Prop, which consists of the data for the badge.
   */
  @Input()
  public set price(value: Price) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.price = value));
  }
  public get price(): Price {
    return this.#element.nativeElement.price;
  }

  /**
   * This will be forwarded to the sbb-pearl-chain component - if true the position won't be animated.
   */
  @Input({ transform: booleanAttribute })
  public set disableAnimation(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disableAnimation = value));
  }
  public get disableAnimation(): boolean {
    return this.#element.nativeElement.disableAnimation;
  }

  /**
   * This will be forwarded to the notices section
   */
  @Input()
  public set boarding(value: Boarding) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.boarding = value));
  }
  public get boarding(): Boarding {
    return this.#element.nativeElement.boarding;
  }

  /**
   * The loading state -
   * when this is true it will be render skeleton with an idling animation
   */
  @Input({ transform: booleanAttribute })
  public set loadingTrip(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.loadingTrip = value));
  }
  public get loadingTrip(): boolean {
    return this.#element.nativeElement.loadingTrip;
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
   * The loading state -
   * when this is true it will be render skeleton with an idling animation
   */
  @Input({ transform: booleanAttribute })
  public set loadingPrice(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.loadingPrice = value));
  }
  public get loadingPrice(): boolean {
    return this.#element.nativeElement.loadingPrice;
  }

  /**
   * Hidden label for the card action. It overrides the automatically generated accessibility text for the component. Use this prop to provide custom accessibility information for the component.
   */
  @Input()
  public set cardActionLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.cardActionLabel = value));
  }
  public get cardActionLabel(): string {
    return this.#element.nativeElement.cardActionLabel;
  }

  /**
   * This will be forwarded to the sbb-card component as aria-expanded.
   */
  @Input({ transform: booleanAttribute })
  public set accessibilityExpanded(value: boolean) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityExpanded = value),
    );
  }
  public get accessibilityExpanded(): boolean {
    return this.#element.nativeElement.accessibilityExpanded;
  }

  /**
   * When this prop is true the sbb-card will be in the active state.
   */
  @Input({ transform: booleanAttribute })
  public set active(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.active = value));
  }
  public get active(): boolean {
    return this.#element.nativeElement.active;
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
