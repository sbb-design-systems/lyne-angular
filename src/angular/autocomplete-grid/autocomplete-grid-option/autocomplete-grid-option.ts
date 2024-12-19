/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, Input, NgZone, Output, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbAutocompleteGridOptionElement } from '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-option.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-option.js';

@Directive({
  selector: 'sbb-autocomplete-grid-option',
  standalone: true,
})
export class SbbAutocompleteGridOptionDirective {
  #element: ElementRef<SbbAutocompleteGridOptionElement> = inject(
    ElementRef<SbbAutocompleteGridOptionElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'icon-name' })
  public set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public get iconName(): string {
    return this.#element.nativeElement.iconName;
  }

  @Input()
  public set value(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): string {
    return this.#element.nativeElement.value;
  }

  @Input({ transform: booleanAttribute })
  public set selected(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.selected = value));
  }
  public get selected(): boolean {
    return this.#element.nativeElement.selected;
  }

  @Output() public autocompleteOptionSelectionChange: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'autocompleteOptionSelectionChange',
  );

  @Output() public autocompleteOptionSelected: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'autocompleteOptionSelected',
  );
}