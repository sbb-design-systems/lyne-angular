import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbTableWrapperElement } from '@sbb-esta/lyne-elements/table.pure.js';

/**
 * Wraps a table to enhance its functionality.
 *
 * @slot  - Use the unnamed slot to add the table.
 */
@Directive({
  selector: 'sbb-table-wrapper',
  exportAs: 'sbbTableWrapper',
})
export class SbbTableWrapper {
  static {
    SbbTableWrapperElement.define();
  }

  #element: ElementRef<SbbTableWrapperElement> = inject(ElementRef<SbbTableWrapperElement>);
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

  /**
   * Whether the table wrapper is focusable.
   */
  @Input({ transform: booleanAttribute })
  public set focusable(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.focusable = value));
  }
  public get focusable(): boolean {
    return this.#element.nativeElement.focusable;
  }
}
