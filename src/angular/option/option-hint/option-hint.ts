import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbOptionHintElement } from '@sbb-esta/lyne-elements/option.pure.js';

/**
 * Display a textual hint inside a `sbb-autocomplete` or a `sbb-select`.
 *
 * @slot  - Use the unnamed slot to display the hint message.
 */
@Directive({
  selector: 'sbb-option-hint',
  exportAs: 'sbbOptionHint',
})
export class SbbOptionHint {
  static {
    SbbOptionHintElement.define();
  }

  #element: ElementRef<SbbOptionHintElement> = inject(ElementRef<SbbOptionHintElement>);
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
