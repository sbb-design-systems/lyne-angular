import { Directive, ElementRef, inject, Input, NgZone, Output } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbAutocompleteGridOptionElement } from '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-option.js';
import { fromEvent, type Observable, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/autocomplete-grid/autocomplete-grid-option.js';

@Directive({
  selector: 'sbb-autocomplete-grid-option',
})
export class SbbAutocompleteGridOption {
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

  @Input()
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

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('autocompleteOptionSelectionChange')
  protected _autocompleteOptionSelectionChange: (typeof this)['autocompleteOptionSelectionChange'] =
    NEVER;
  public autocompleteOptionSelectionChange: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'autocompleteOptionSelectionChange',
  );

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('autocompleteOptionSelected')
  protected _autocompleteOptionSelected: (typeof this)['autocompleteOptionSelected'] = NEVER;
  public autocompleteOptionSelected: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'autocompleteOptionSelected',
  );
}
