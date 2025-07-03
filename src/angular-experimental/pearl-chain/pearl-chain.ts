import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { Leg, PtRideLeg } from '@sbb-esta/lyne-elements-experimental/core/timetable.js';
import type { SbbPearlChainElement } from '@sbb-esta/lyne-elements-experimental/pearl-chain.js';

import '@sbb-esta/lyne-elements-experimental/pearl-chain.js';

@Directive({
  selector: 'sbb-pearl-chain',
  exportAs: 'sbbPearlChain',
})
export class SbbPearlChain {
  #element: ElementRef<SbbPearlChainElement> = inject(ElementRef<SbbPearlChainElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set legs(value: (Leg | PtRideLeg)[]) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.legs = value));
  }
  public get legs(): (Leg | PtRideLeg)[] {
    return this.#element.nativeElement.legs;
  }

  @Input({ transform: booleanAttribute })
  public set disableAnimation(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disableAnimation = value));
  }
  public get disableAnimation(): boolean {
    return this.#element.nativeElement.disableAnimation;
  }

  @Input()
  public set now(value: Date | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.now = value));
  }
  public get now(): Date | null {
    return this.#element.nativeElement.now;
  }
}
