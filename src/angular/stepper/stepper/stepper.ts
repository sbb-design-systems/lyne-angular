import { Directive, ElementRef, inject, Input, NgZone, type OutputRef } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute, internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbHorizontalFrom, SbbOrientation } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbStepElement } from '@sbb-esta/lyne-elements/stepper/step.js';
import type {
  SbbStepChangeEvent,
  SbbStepperElement,
} from '@sbb-esta/lyne-elements/stepper/stepper.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/stepper/stepper.js';

/**
 * Provides a structured, step-by-step workflow for user interactions.
 *
 * @slot  - Provide a `sbb-expansion-panel-header` and a `sbb-expansion-panel-content` to the stepper.
 * @slot step-label - Use this slot to provide an `sbb-step-label`.
 * @slot step - Use this slot to provide an `sbb-step`.
 */
@Directive({
  selector: 'sbb-stepper',
  exportAs: 'sbbStepper',
})
export class SbbStepper {
  #element: ElementRef<SbbStepperElement> = inject(ElementRef<SbbStepperElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * If set to true, only the current and previous labels can be clicked and selected.
   */
  @Input({ transform: booleanAttribute })
  public set linear(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.linear = value));
  }
  public get linear(): boolean {
    return this.#element.nativeElement.linear;
  }

  /**
   * Overrides the behaviour of `orientation` property.
   */
  @Input()
  public set horizontalFrom(value: SbbHorizontalFrom | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.horizontalFrom = value));
  }
  public get horizontalFrom(): SbbHorizontalFrom | null {
    return this.#element.nativeElement.horizontalFrom;
  }

  /**
   * Steps orientation, either horizontal or vertical.
   */
  @Input()
  public set orientation(value: SbbOrientation) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.orientation = value));
  }
  public get orientation(): SbbOrientation {
    return this.#element.nativeElement.orientation;
  }

  /**
   * Size variant, either s or m.
   */
  @Input()
  public set size(value: 's' | 'm') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 's' | 'm' {
    return this.#element.nativeElement.size;
  }

  /**
   * The currently selected step.
   */
  @Input()
  public set selected(value: SbbStepElement | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.selected = value));
  }
  public get selected(): SbbStepElement | null {
    return this.#element.nativeElement.selected;
  }

  /**
   * The currently selected step index.
   */
  @Input()
  public set selectedIndex(value: number | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.selectedIndex = value));
  }
  public get selectedIndex(): number | null {
    return this.#element.nativeElement.selectedIndex;
  }

  /**
   * The steps of the stepper.
   */
  public get steps(): SbbStepElement[] {
    return this.#element.nativeElement.steps;
  }

  /**
   * Selects the next step.
   */
  public next(): void {
    return this.#element.nativeElement.next();
  }

  /**
   * Selects the previous step.
   */
  public previous(): void {
    return this.#element.nativeElement.previous();
  }

  /**
   * Resets the form in which the stepper is nested or every form of each step, if any.
   */
  public reset(): void {
    return this.#element.nativeElement.reset();
  }

  protected _stepchangeOutput: OutputRef<SbbStepChangeEvent> =
    outputFromObservable<SbbStepChangeEvent>(NEVER, { alias: 'stepchange' });
  /**
   * Emits whenever a step was changed.
   */
  public stepchangeOutput: OutputRef<SbbStepChangeEvent> = internalOutputFromObservable(
    fromEvent<SbbStepChangeEvent>(this.#element.nativeElement, 'stepchange'),
  );
}
