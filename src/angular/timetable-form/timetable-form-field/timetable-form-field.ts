import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbTimetableFormFieldElement } from '@sbb-esta/lyne-elements/timetable-form/timetable-form-field.js';

import '@sbb-esta/lyne-elements/timetable-form/timetable-form-field.js';

@Directive({
  selector: 'sbb-timetable-form-field',
  exportAs: 'sbbTimetableFormField',
})
export class SbbTimetableFormField {
  #element: ElementRef<SbbTimetableFormFieldElement> = inject(
    ElementRef<SbbTimetableFormFieldElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set borderless(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.borderless = value));
  }
  public get borderless(): boolean {
    return this.#element.nativeElement.borderless;
  }

  @Input({ transform: booleanAttribute })
  public set floatingLabel(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.floatingLabel = value));
  }
  public get floatingLabel(): boolean {
    return this.#element.nativeElement.floatingLabel;
  }

  @Input()
  public set width(value: 'default' | 'collapse') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.width = value));
  }
  public get width(): string {
    return this.#element.nativeElement.width;
  }

  @Input()
  public set size(value: 'l' | 'm' | 's') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): string {
    return this.#element.nativeElement.size;
  }

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  @Input()
  public set errorSpace(value: 'none' | 'reserve') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.errorSpace = value));
  }
  public get errorSpace(): 'none' | 'reserve' {
    return this.#element.nativeElement.errorSpace;
  }

  @Input({ transform: booleanAttribute })
  public set optional(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.optional = value));
  }
  public get optional(): boolean {
    return this.#element.nativeElement.optional;
  }

  @Input({ transform: booleanAttribute })
  public set hiddenLabel(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hiddenLabel = value));
  }
  public get hiddenLabel(): boolean {
    return this.#element.nativeElement.hiddenLabel;
  }

  public get inputElement(): HTMLInputElement | HTMLSelectElement | HTMLElement | null {
    return this.#element.nativeElement.inputElement;
  }

  public reset(): void {
    return this.#element.nativeElement.reset();
  }

  public clear(): void {
    return this.#element.nativeElement.clear();
  }
}
