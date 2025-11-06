import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbOptGroupElement } from '@sbb-esta/lyne-elements/option/optgroup.js';

import '@sbb-esta/lyne-elements/option/optgroup.js';

/**
 * It can be used as a container for one or more `sbb-option`.
 *
 * @slot  - Use the unnamed slot to add `sbb-option` elements to the `sbb-optgroup`.
 */
@Directive({
  selector: 'sbb-optgroup',
  exportAs: 'sbbOptGroup',
})
export class SbbOptGroup {
  #element: ElementRef<SbbOptGroupElement> = inject(ElementRef<SbbOptGroupElement>);
  #ngZone: NgZone = inject(NgZone);

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

  /**
   * Option group label.
   */
  @Input()
  public set label(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.label = value));
  }
  public get label(): string {
    return this.#element.nativeElement.label;
  }
}
