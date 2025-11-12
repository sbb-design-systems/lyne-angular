import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { Leg, PtRideLeg } from '@sbb-esta/lyne-elements-experimental/core/timetable.js';
import type { SbbPearlChainElement } from '@sbb-esta/lyne-elements-experimental/pearl-chain.js';

import '@sbb-esta/lyne-elements-experimental/pearl-chain.js';

/**
 * It visually displays journey information.
 */
@Directive({
  selector: 'sbb-pearl-chain',
  exportAs: 'sbbPearlChain',
})
export class SbbPearlChain {
  #element: ElementRef<SbbPearlChainElement> = inject(ElementRef<SbbPearlChainElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Define the legs of the pearl-chain.
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
   * A configured date which acts as the current date instead of the real current date.
   * Only recommended for testing purposes.
   */
  @Input()
  public set now(value: Date | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.now = value));
  }
  public get now(): Date | null {
    return this.#element.nativeElement.now;
  }
}
