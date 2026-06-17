import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbHintElement } from '@sbb-esta/lyne-elements/form-field.pure.js';

/**
 * It displays a hint message in the `sbb-form-field`.
 *
 * @slot  - Use the unnamed slot to display the hint message.
 */
@Directive({
  selector: 'sbb-hint',
  exportAs: 'sbbHint',
})
export class SbbHint {
  static {
    SbbHintElement.define();
  }

  #element: ElementRef<SbbHintElement> = inject(ElementRef<SbbHintElement>);
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
