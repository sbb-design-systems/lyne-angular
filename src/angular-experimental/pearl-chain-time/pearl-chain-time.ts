import { Directive, ElementRef, inject, Input, NgZone, numberAttribute } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { Leg, PtRideLeg } from '@sbb-esta/lyne-elements-experimental/core/timetable.js';
import type { SbbPearlChainTimeElement } from '@sbb-esta/lyne-elements-experimental/pearl-chain-time.js';
import '@sbb-esta/lyne-elements-experimental/pearl-chain-time.js';

@Directive({
  selector: 'sbb-pearl-chain-time',
  exportAs: 'sbbPearlChainTime',
})
export class SbbPearlChainTime {
  #element: ElementRef<SbbPearlChainTimeElement> = inject(ElementRef<SbbPearlChainTimeElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set legs(value: (Leg | PtRideLeg)[]) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.legs = value));
  }
  public get legs(): (Leg | PtRideLeg)[] {
    return this.#element.nativeElement.legs;
  }

  @Input()
  public set departureTime(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.departureTime = value));
  }
  public get departureTime(): string {
    return this.#element.nativeElement.departureTime;
  }

  @Input()
  public set arrivalTime(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.arrivalTime = value));
  }
  public get arrivalTime(): string {
    return this.#element.nativeElement.arrivalTime;
  }

  @Input({ transform: numberAttribute })
  public set departureWalk(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.departureWalk = value));
  }
  public get departureWalk(): number {
    return this.#element.nativeElement.departureWalk;
  }

  @Input({ transform: numberAttribute })
  public set arrivalWalk(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.arrivalWalk = value));
  }
  public get arrivalWalk(): number {
    return this.#element.nativeElement.arrivalWalk;
  }

  @Input({ transform: booleanAttribute })
  public set disableAnimation(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disableAnimation = value));
  }
  public get disableAnimation(): boolean {
    return this.#element.nativeElement.disableAnimation;
  }

  @Input({ transform: booleanAttribute })
  public set a11yFootpath(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.a11yFootpath = value));
  }
  public get a11yFootpath(): boolean {
    return this.#element.nativeElement.a11yFootpath;
  }

  @Input()
  public set now(value: Date) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.now = value));
  }
  public get now(): Date {
    return this.#element.nativeElement.now;
  }
}
