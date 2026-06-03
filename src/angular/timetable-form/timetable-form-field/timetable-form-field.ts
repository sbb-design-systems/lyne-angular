import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbTimetableFormFieldElement } from '@sbb-esta/lyne-elements/timetable-form.js';

import '@sbb-esta/lyne-elements/timetable-form.js';

/**
 * Extends the `sbb-form-field`. Meant to be used inside a `sbb-timetable-form`.
 *
 * @slot  - Use this slot to render an input/select or a supported non-native element.
 * @slot label - Use this slot to render a label.
 * @slot prefix - Use this slot to render an icon on the left side of the input.
 * @slot suffix - Use this slot to render an icon on the right side of the input.
 * @slot error - Use this slot to render an error.
 * @slot hint - Use this slot to render an `<sbb-hint>` or an `<sbb-form-field-text-counter>` element.
 * @cssprop [--sbb-form-field-outline-offset=undefined] - To override the focus outline offset,
 * @cssprop [--sbb-form-field-focus-underline-z-index=undefined] - To override the z-index of the focus underline effect,
 */
@Directive({
  selector: 'sbb-timetable-form-field',
  exportAs: 'sbbTimetableFormField',
})
export class SbbTimetableFormField {
  #element: ElementRef<SbbTimetableFormFieldElement> = inject(
    ElementRef<SbbTimetableFormFieldElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  /**
   * Whether to display the form field without a border.
   */
  @Input({ transform: booleanAttribute })
  public set borderless(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.borderless = value));
  }
  public get borderless(): boolean {
    return this.#element.nativeElement.borderless;
  }

  /**
   * Whether the label should float. If activated, the placeholder of the input is hidden.
   */
  @Input({ transform: booleanAttribute })
  public set floatingLabel(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.floatingLabel = value));
  }
  public get floatingLabel(): boolean {
    return this.#element.nativeElement.floatingLabel;
  }

  /**
   * Defines the width of the component:
   * - `default`: the component has defined width and min-width;
   * - `collapse`: the component adapts itself to its inner input content.
   */
  @Input()
  public set width(value: 'default' | 'collapse') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.width = value));
  }
  public get width(): string {
    return this.#element.nativeElement.width;
  }

  /**
   * Size variant, either s, m or l (default).
   */
  @Input()
  public set size(value: 'l' | 'm' | 's' | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'l' | 'm' | 's' | null {
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
   * Whether to reserve space for an error message, hint or text-counter.
   * `none` does not reserve any space.
   * `reserve` does reserve one row for an error message.
   */
  @Input()
  public set errorSpace(value: 'none' | 'reserve') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.errorSpace = value));
  }
  public get errorSpace(): 'none' | 'reserve' {
    return this.#element.nativeElement.errorSpace;
  }

  /**
   * Whether to visually hide the label. If hidden, screen readers will still read it.
   */
  @Input({ transform: booleanAttribute })
  public set hiddenLabel(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hiddenLabel = value));
  }
  public get hiddenLabel(): boolean {
    return this.#element.nativeElement.hiddenLabel;
  }

  /**
   * Returns the input element.
   */
  public get inputElement(): HTMLInputElement | HTMLSelectElement | HTMLElement | null {
    return this.#element.nativeElement.inputElement;
  }

  /**
   * Manually reset the form field. Currently, this only resets the floating label.
   */
  public reset(): void {
    return this.#element.nativeElement.reset();
  }

  /**
   * Manually clears the input value. It only works for inputs, selects are not supported.
   */
  public clear(): void {
    return this.#element.nativeElement.clear();
  }

  /**
   * Reference to the slotted label.
   */
  public get label(): HTMLLabelElement | null {
    return this.#element.nativeElement.label;
  }
}
