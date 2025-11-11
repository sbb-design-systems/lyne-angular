import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbChipLabelElement } from '@sbb-esta/lyne-elements/chip-label.js';

import '@sbb-esta/lyne-elements/chip-label.js';

/**
 * It displays brief and compact information.
 *
 * @slot  - Use the unnamed slot to add content to the `sbb-chip-label`.
 */
@Directive({
  selector: 'sbb-chip-label',
  exportAs: 'sbbChipLabel',
})
export class SbbChipLabel {
  #element: ElementRef<SbbChipLabelElement> = inject(ElementRef<SbbChipLabelElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Size of the chip.
   */
  @Input()
  public set size(value: 'xxs' | 'xs' | 's') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'xxs' | 'xs' | 's' {
    return this.#element.nativeElement.size;
  }

  /**
   * Color of the chip.
   */
  @Input()
  public set color(value: 'milk' | 'charcoal' | 'white' | 'granite') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'milk' | 'charcoal' | 'white' | 'granite' {
    return this.#element.nativeElement.color;
  }
}
