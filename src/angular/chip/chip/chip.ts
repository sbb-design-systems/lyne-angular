import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbChipElement } from '@sbb-esta/lyne-elements/chip/chip.js';

import '@sbb-esta/lyne-elements/chip/chip.js';

/**
 * It displays a chip. Usually used in combination with `sbb-chip-group`.
 *
 * @slot  - Use the unnamed slot to add the display value. If not provided, the 'value' will be used.
 */
@Directive({
  selector: 'sbb-chip',
  exportAs: 'sbbChip',
})
export class SbbChip<T = string> {
  #element: ElementRef<SbbChipElement<T>> = inject(ElementRef<SbbChipElement<T>>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * The value of chip. Will be used as label if nothing is slotted.
   */
  @Input()
  public set value(value: T | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): T | null {
    return this.#element.nativeElement.value;
  }

  /**
   * Whether the component is readonly.
   */
  @Input({ transform: booleanAttribute })
  public set readOnly(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.readOnly = value));
  }
  public get readOnly(): boolean {
    return this.#element.nativeElement.readOnly;
  }

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
   * Whether the component is disabled.
   */
  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }
}
