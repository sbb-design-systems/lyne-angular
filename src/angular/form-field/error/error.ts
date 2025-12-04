import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbErrorElement } from '@sbb-esta/lyne-elements/form-field/error.js';

import '@sbb-esta/lyne-elements/form-field/error.js';

/**
 * It displays an error message in the `sbb-form-field`.
 *
 * @slot  - Use this slot to display the error message.
 * @slot icon - Use this slot to override the default error icon.
 */
@Directive({
  selector: 'sbb-error',
  exportAs: 'sbbError',
})
export class SbbError {
  #element: ElementRef<SbbErrorElement> = inject(ElementRef<SbbErrorElement>);
  #ngZone: NgZone = inject(NgZone);

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
}
