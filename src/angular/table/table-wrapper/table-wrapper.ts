/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbTableWrapperElement } from '@sbb-esta/lyne-elements/table/table-wrapper.js';
import '@sbb-esta/lyne-elements/table/table-wrapper.js';

@Directive({
  selector: 'sbb-table-wrapper',
  standalone: true,
})
export class SbbTableWrapperDirective {
  #element: ElementRef<SbbTableWrapperElement> = inject(ElementRef<SbbTableWrapperElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }
}