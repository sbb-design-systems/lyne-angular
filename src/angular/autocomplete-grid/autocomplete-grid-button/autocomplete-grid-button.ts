/* eslint-disable @angular-eslint/directive-selector, @angular-eslint/directive-class-suffix */
import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbAutocompleteGridButtonElement } from '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-button.js';
import '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-button.js';
import { SbbAutocompleteGridOptionElement } from '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-option.js';

@Directive({
  selector: 'sbb-autocomplete-grid-button',
  standalone: true,
})
export class SbbAutocompleteGridButton {
  #element: ElementRef<SbbAutocompleteGridButtonElement> = inject(
    ElementRef<SbbAutocompleteGridButtonElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'icon-name' })
  public set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public get iconName(): string {
    return this.#element.nativeElement.iconName;
  }

  public get option(): SbbAutocompleteGridOptionElement | null {
    return this.#element.nativeElement.option;
  }
}
