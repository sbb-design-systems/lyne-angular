import { Directive, ElementRef, inject, Input, NgZone, numberAttribute } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { Leg, PtRideLeg } from '@sbb-esta/lyne-elements-experimental/core/timetable.js';
import type { SbbPearlChainTimeElement } from '@sbb-esta/lyne-elements-experimental/pearl-chain-time.js';

import '@sbb-esta/lyne-elements-experimental/pearl-chain-time.js';

/**
 * Combined with `sbb-pearl-chain`, it displays walk time information.
 */
@Directive({
  selector: 'sbb-pearl-chain-time',
  exportAs: 'sbbPearlChainTime',
})
export class SbbPearlChainTime {
  #element: ElementRef<SbbPearlChainTimeElement> = inject(ElementRef<SbbPearlChainTimeElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * define the legs of the pearl-chain.
   * Format:
   * `{"legs": [{"duration": 25}, ...]}`
   * `duration` in minutes. Duration of the leg is relative
   * to the total travel time. Example: departure 16:30, change at 16:40,
   * arrival at 17:00. So the change should have a duration of 33.33%.
   */
  @Input()
  public set legs(value: (Leg | PtRideLeg)[]) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.legs = value));
  }
  public get legs(): (Leg | PtRideLeg)[] {
    return this.#element.nativeElement.legs;
  }

  /**
   * Prop to render the departure time - will be formatted as "H:mm"
   */
  @Input()
  public set departureTime(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.departureTime = value));
  }
  public get departureTime(): string {
    return this.#element.nativeElement.departureTime;
  }

  /**
   * Prop to render the arrival time - will be formatted as "H:mm"
   */
  @Input()
  public set arrivalTime(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.arrivalTime = value));
  }
  public get arrivalTime(): string {
    return this.#element.nativeElement.arrivalTime;
  }

  /**
   * Optional prop to render the walk time (in minutes) before departure
   */
  @Input({ transform: numberAttribute })
  public set departureWalk(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.departureWalk = value));
  }
  public get departureWalk(): number {
    return this.#element.nativeElement.departureWalk;
  }

  /**
   * Optional prop to render the walk time (in minutes) after arrival
   */
  @Input({ transform: numberAttribute })
  public set arrivalWalk(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.arrivalWalk = value));
  }
  public get arrivalWalk(): number {
    return this.#element.nativeElement.arrivalWalk;
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
   * Optional prop to render wheelchair-small instead of walk-small
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
