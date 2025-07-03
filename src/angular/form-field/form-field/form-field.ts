import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbFormFieldElement } from '@sbb-esta/lyne-elements/form-field/form-field.js';

import '@sbb-esta/lyne-elements/form-field/form-field.js';

@Directive({
  selector: 'sbb-form-field',
  exportAs: 'sbbFormField',
})
export class SbbFormField {
  #element: ElementRef<SbbFormFieldElement> = inject(ElementRef<SbbFormFieldElement>);
  #ngZone: NgZone = inject(NgZone);

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

  @Input()
  public set size(value: 'l' | 'm' | 's') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'l' | 'm' | 's' {
    return this.#element.nativeElement.size;
  }

  @Input({ transform: booleanAttribute })
  public set borderless(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.borderless = value));
  }
  public get borderless(): boolean {
    return this.#element.nativeElement.borderless;
  }

  @Input()
  public set width(value: 'default' | 'collapse') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.width = value));
  }
  public get width(): 'default' | 'collapse' {
    return this.#element.nativeElement.width;
  }

  @Input({ transform: booleanAttribute })
  public set hiddenLabel(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hiddenLabel = value));
  }
  public get hiddenLabel(): boolean {
    return this.#element.nativeElement.hiddenLabel;
  }

  @Input({ transform: booleanAttribute })
  public set floatingLabel(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.floatingLabel = value));
  }
  public get floatingLabel(): boolean {
    return this.#element.nativeElement.floatingLabel;
  }

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  public get inputElement(): HTMLInputElement | HTMLSelectElement | HTMLElement | undefined {
    return this.#element.nativeElement.inputElement;
  }

  public reset(): void {
    return this.#element.nativeElement.reset();
  }

  public clear(): void {
    return this.#element.nativeElement.clear();
  }
}
