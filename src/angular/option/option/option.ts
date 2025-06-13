import { Directive, ElementRef, inject, Input, NgZone, Output } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbOptionElement } from '@sbb-esta/lyne-elements/option/option.js';
import { fromEvent, NEVER, type Observable } from 'rxjs';

import '@sbb-esta/lyne-elements/option/option.js';

@Directive({
  selector: 'sbb-option',
  exportAs: 'sbbOption',
})
export class SbbOption<T = string> {
  #element: ElementRef<SbbOptionElement<T>> = inject(ElementRef<SbbOptionElement<T>>);
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
  public set value(value: T) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): T {
    return this.#element.nativeElement.value;
  }

  @Input({ transform: booleanAttribute })
  public set selected(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.selected = value));
  }
  public get selected(): boolean {
    return this.#element.nativeElement.selected;
  }

  @Output('optionSelectionChange')
  protected _optionSelectionChange: (typeof this)['optionSelectionChange'] = NEVER;
  public optionSelectionChange: Observable<CustomEvent<void>> = fromEvent<CustomEvent<void>>(
    this.#element.nativeElement,
    'optionSelectionChange',
  );

  @Output('optionSelected') protected _optionSelected: (typeof this)['optionSelected'] = NEVER;
  public optionSelected: Observable<CustomEvent<void>> = fromEvent<CustomEvent<void>>(
    this.#element.nativeElement,
    'optionSelected',
  );
}
