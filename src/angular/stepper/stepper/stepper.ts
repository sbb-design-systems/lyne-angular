import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbHorizontalFrom, SbbOrientation } from '@sbb-esta/lyne-elements/core/interfaces.js';
import { SbbStepElement } from '@sbb-esta/lyne-elements/stepper/step.js';
import type { SbbStepperElement } from '@sbb-esta/lyne-elements/stepper/stepper.js';
import '@sbb-esta/lyne-elements/stepper/stepper.js';

@Directive({
  selector: 'sbb-stepper',
})
export class SbbStepper {
  #element: ElementRef<SbbStepperElement> = inject(ElementRef<SbbStepperElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set linear(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.linear = value));
  }
  public get linear(): boolean {
    return this.#element.nativeElement.linear;
  }

  @Input()
  public set horizontalFrom(value: SbbHorizontalFrom | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.horizontalFrom = value));
  }
  public get horizontalFrom(): SbbHorizontalFrom | null {
    return this.#element.nativeElement.horizontalFrom;
  }

  @Input()
  public set orientation(value: SbbOrientation) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.orientation = value));
  }
  public get orientation(): SbbOrientation {
    return this.#element.nativeElement.orientation;
  }

  @Input()
  public set size(value: 's' | 'm') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 's' | 'm' {
    return this.#element.nativeElement.size;
  }

  @Input()
  public set selected(value: SbbStepElement | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.selected = value));
  }
  public get selected(): SbbStepElement | null {
    return this.#element.nativeElement.selected;
  }

  @Input()
  public set selectedIndex(value: number | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.selectedIndex = value));
  }
  public get selectedIndex(): number | null {
    return this.#element.nativeElement.selectedIndex;
  }

  public get steps(): SbbStepElement[] {
    return this.#element.nativeElement.steps;
  }

  public next(): void {
    return this.#element.nativeElement.next();
  }

  public previous(): void {
    return this.#element.nativeElement.previous();
  }

  public reset(): void {
    return this.#element.nativeElement.reset();
  }
}
