import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbAutocompleteGridOptgroupElement } from '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-optgroup.js';

import '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-optgroup.js';

/**
 * It can be used as a container for one or more `sbb-autocomplete-grid-option`.
 *
 * @slot  - Use the unnamed slot to add `sbb-autocomplete-grid-option` elements to the `sbb-autocomplete-grid-optgroup`.
 */
@Directive({
  selector: 'sbb-autocomplete-grid-optgroup',
  exportAs: 'sbbAutocompleteGridOptgroup',
})
export class SbbAutocompleteGridOptgroup {
  #element: ElementRef<SbbAutocompleteGridOptgroupElement> = inject(
    ElementRef<SbbAutocompleteGridOptgroupElement>,
  );
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
