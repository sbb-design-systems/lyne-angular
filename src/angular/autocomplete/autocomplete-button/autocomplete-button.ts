import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbAutocompleteButtonElement } from '@sbb-esta/lyne-elements/autocomplete.pure.js';
import type { SbbOptGroupElement, SbbOptionElement } from '@sbb-esta/lyne-elements/option.pure.js';

/**
 * It displays an icon-only button that can be used in a `sbb-autocomplete-row`.
 *
 * @slot icon - Slot used to display the icon, if one is set
 */
@Directive({
  selector: 'sbb-autocomplete-button',
  exportAs: 'sbbAutocompleteButton',
})
export class SbbAutocompleteButton {
  static {
    SbbAutocompleteButtonElement.define();
  }

  #element: ElementRef<SbbAutocompleteButtonElement> = inject(
    ElementRef<SbbAutocompleteButtonElement>,
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
   * Gets the SbbOptionElement on the same row of the button.
   */
  public get option(): SbbOptionElement | null {
    return this.#element.nativeElement.option;
  }

  /**
   * Gets the parent SbbOptGroupElement, if present.
   */
  public get optgroup(): SbbOptGroupElement | null {
    return this.#element.nativeElement.optgroup;
  }
}
