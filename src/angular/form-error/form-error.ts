/* eslint-disable @angular-eslint/directive-selector, @angular-eslint/directive-class-suffix */
import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbFormErrorElement } from '@sbb-esta/lyne-elements/form-error.js';
import '@sbb-esta/lyne-elements/form-error.js';

@Directive({
  selector: 'sbb-form-error',
  standalone: true,
})
export class SbbFormError {
  #element: ElementRef<SbbFormErrorElement> = inject(ElementRef<SbbFormErrorElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }
}
