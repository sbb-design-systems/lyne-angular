import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type {
  SbbMiniButtonGroupElement,
  SbbMiniButtonGroupSize,
} from '@sbb-esta/lyne-elements/button/mini-button-group.js';

import '@sbb-esta/lyne-elements/button/mini-button-group.js';

/**
 * Display a list of `sbb-mini-button` elements in a horizontal container,
possibly separated by a `sbb-divider` component.
 *
 * @slot  - Use the unnamed slot to add `sbb-mini-button` and `sbb-divider` elements.
 */
@Directive({
  selector: 'sbb-mini-button-group',
  exportAs: 'sbbMiniButtonGroup',
})
export class SbbMiniButtonGroup {
  #element: ElementRef<SbbMiniButtonGroupElement> = inject(ElementRef<SbbMiniButtonGroupElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * This will be forwarded as aria-label to the list that contains the buttons.
   */
  @Input()
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }

  /**
   * Size variant, either s, m, l or xl.
   */
  @Input()
  public set size(value: SbbMiniButtonGroupSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbMiniButtonGroupSize {
    return this.#element.nativeElement.size;
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
}
