import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbFormFieldTextCounterElement } from '@sbb-esta/lyne-elements/form-field.pure.js';

/**
 * It displays the remaining characters count for input/textarea elements with a configured
 * maxlength property in the `sbb-form-field`.
 * The component automatically uses the form field's inputElement and displays the remaining character count.
 * If the input is disabled, readonly or an `sbb-error` is present, the output is suppressed.
 *
 * @slot  - Use the unnamed slot to display a custom description text after the counter.
 */
@Directive({
  selector: 'sbb-form-field-text-counter',
  exportAs: 'sbbFormFieldTextCounter',
})
export class SbbFormFieldTextCounter {
  static {
    SbbFormFieldTextCounterElement.define();
  }

  #element: ElementRef<SbbFormFieldTextCounterElement> = inject(
    ElementRef<SbbFormFieldTextCounterElement>,
  );
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
