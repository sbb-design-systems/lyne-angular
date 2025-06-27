import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbSeatReservationScopedElement } from '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation/seat-reservation-scoped.js';

import '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation/seat-reservation-scoped.js';

@Directive({
  selector: 'sbb-seat-reservation-scoped',
  exportAs: 'sbbSeatReservationScoped',
})
export class SbbSeatReservationScoped {
  #element: ElementRef<SbbSeatReservationScopedElement> = inject(
    ElementRef<SbbSeatReservationScopedElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set insetBlockStart(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.insetBlockStart = value));
  }
  public get insetBlockStart(): string {
    return this.#element.nativeElement.insetBlockStart;
  }

  @Input()
  public set insetInlineStart(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.insetInlineStart = value));
  }
  public get insetInlineStart(): string {
    return this.#element.nativeElement.insetInlineStart;
  }

  @Input()
  public set width(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.width = value));
  }
  public get width(): string {
    return this.#element.nativeElement.width;
  }

  @Input()
  public set height(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.height = value));
  }
  public get height(): string {
    return this.#element.nativeElement.height;
  }

  @Input()
  public set zIndex(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.zIndex = value));
  }
  public get zIndex(): string {
    return this.#element.nativeElement.zIndex;
  }

  @Input()
  public set cellId(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.cellId = value));
  }
  public get cellId(): string {
    return this.#element.nativeElement.cellId;
  }

  @Input()
  public set scopedClasses(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.scopedClasses = value));
  }
  public get scopedClasses(): string {
    return this.#element.nativeElement.scopedClasses;
  }
}
