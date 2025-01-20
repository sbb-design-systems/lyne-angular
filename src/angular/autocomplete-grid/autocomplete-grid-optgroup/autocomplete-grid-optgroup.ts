/* eslint-disable @angular-eslint/directive-selector, @angular-eslint/directive-class-suffix */
import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbAutocompleteGridOptgroupElement } from '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-optgroup.js';
import '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-optgroup.js';

@Directive({
  selector: 'sbb-autocomplete-grid-optgroup',
  standalone: true,
})
export class SbbAutocompleteGridOptgroup {
  #element: ElementRef<SbbAutocompleteGridOptgroupElement> = inject(
    ElementRef<SbbAutocompleteGridOptgroupElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }

  @Input()
  public set label(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.label = value));
  }
  public get label(): string {
    return this.#element.nativeElement.label;
  }
}
