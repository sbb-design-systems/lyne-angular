import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbAutocompleteElement } from '@sbb-esta/lyne-elements/autocomplete.js';

import '@sbb-esta/lyne-elements/autocomplete.js';

@Directive({
  selector: 'sbb-autocomplete',
  exportAs: 'sbbAutocomplete',
})
export class SbbAutocomplete<T = string> {
  #element: ElementRef<SbbAutocompleteElement<T>> = inject(ElementRef<SbbAutocompleteElement<T>>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set size(value: 'm' | 's') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'm' | 's' {
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
  public set origin(value: HTMLElement | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.origin = value));
  }
  public get origin(): HTMLElement | null {
    return this.#element.nativeElement.origin;
  }

  @Input()
  public set trigger(value: HTMLInputElement | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.trigger = value));
  }
  public get trigger(): HTMLInputElement | null {
    return this.#element.nativeElement.trigger;
  }

  @Input({ transform: booleanAttribute })
  public set preserveIconSpace(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.preserveIconSpace = value));
  }
  public get preserveIconSpace(): boolean {
    return this.#element.nativeElement.preserveIconSpace;
  }

  public get originElement(): HTMLElement | null {
    return this.#element.nativeElement.originElement;
  }

  public get triggerElement(): HTMLInputElement | null | undefined {
    return this.#element.nativeElement.triggerElement;
  }

  public get isOpen(): boolean {
    return this.#element.nativeElement.isOpen;
  }

  public open(): void {
    return this.#element.nativeElement.open();
  }

  public close(): void {
    return this.#element.nativeElement.close();
  }

  @Input({ transform: booleanAttribute })
  public set autoActiveFirstOption(value: boolean) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.autoActiveFirstOption = value),
    );
  }
  public get autoActiveFirstOption(): boolean {
    return this.#element.nativeElement.autoActiveFirstOption;
  }

  @Input()
  public set displayWith(value: ((value: T) => string) | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.displayWith = value));
  }
  public get displayWith(): ((value: T) => string) | null {
    return this.#element.nativeElement.displayWith;
  }
}
