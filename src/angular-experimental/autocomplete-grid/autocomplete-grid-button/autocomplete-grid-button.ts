import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbAutocompleteGridButtonElement } from '@sbb-esta/lyne-elements-experimental/autocomplete-grid/autocomplete-grid-button.js';
import type { SbbAutocompleteGridOptionElement } from '@sbb-esta/lyne-elements-experimental/autocomplete-grid/autocomplete-grid-option.js';

import '@sbb-esta/lyne-elements-experimental/autocomplete-grid/autocomplete-grid-button.js';

/**
 * It displays an icon-only button that can be used in `sbb-autocomplete-grid`.
 *
 * @slot icon - Slot used to display the icon, if one is set
 */
@Directive({
  selector: 'sbb-autocomplete-grid-button',
  exportAs: 'sbbAutocompleteGridButton',
})
export class SbbAutocompleteGridButton {
  #element: ElementRef<SbbAutocompleteGridButtonElement> = inject(
    ElementRef<SbbAutocompleteGridButtonElement>,
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
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @Input()
  public set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public get iconName(): string {
    return this.#element.nativeElement.iconName;
  }

  /**
   * Gets the SbbAutocompleteGridOptionElement on the same row of the button.
   */
  public get option(): SbbAutocompleteGridOptionElement | null {
    return this.#element.nativeElement.option;
  }

  public get optgroup(): SbbAutocompleteGridOptgroupElement | null {
    return this.#element.nativeElement.optgroup;
  }
}
