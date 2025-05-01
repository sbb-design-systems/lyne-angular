import { Directive, ElementRef, forwardRef, inject, Input, NgZone, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { booleanAttribute, SbbControlValueAccessorMixin } from '@sbb-esta/lyne-angular/core';
import type { SbbToggleOptionElement } from '@sbb-esta/lyne-elements/toggle/toggle-option.js';
import type { SbbToggleElement } from '@sbb-esta/lyne-elements/toggle/toggle.js';
import { fromEvent, NEVER, type Observable } from 'rxjs';

import '@sbb-esta/lyne-elements/toggle/toggle.js';

@Directive({
  selector: 'sbb-toggle',
  exportAs: 'sbbToggle',
  host: {
    '(change)': 'this.onChangeFn(this.value)',
    '(focusout)': 'this.onTouchedFn()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SbbToggle),
      multi: true,
    },
  ],
})
export class SbbToggle extends SbbControlValueAccessorMixin(class {}) {
  #element: ElementRef<SbbToggleElement> = inject(ElementRef<SbbToggleElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }

  @Input({ transform: booleanAttribute })
  public set even(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.even = value));
  }
  public get even(): boolean {
    return this.#element.nativeElement.even;
  }

  @Input()
  public set size(value: 's' | 'm') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 's' | 'm' {
    return this.#element.nativeElement.size;
  }

  @Input()
  public set value(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): string {
    return this.#element.nativeElement.value;
  }

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output('change') protected _change: (typeof this)['change'] = NEVER;
  public change: Observable<CustomEvent<void>> = fromEvent<CustomEvent<void>>(
    this.#element.nativeElement,
    'change',
  );

  public get options(): SbbToggleOptionElement[] {
    return this.#element.nativeElement.options;
  }

  @Input()
  public set name(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.name = value));
  }
  public get name(): string {
    return this.#element.nativeElement.name;
  }

  public get form(): HTMLFormElement | null {
    return this.#element.nativeElement.form;
  }

  public get validity(): ValidityState {
    return this.#element.nativeElement.validity;
  }

  public get validationMessage(): string {
    return this.#element.nativeElement.validationMessage;
  }

  public get willValidate(): boolean {
    return this.#element.nativeElement.willValidate;
  }

  public checkValidity(): boolean {
    return this.#element.nativeElement.checkValidity();
  }

  public reportValidity(): boolean {
    return this.#element.nativeElement.reportValidity();
  }

  public setCustomValidity(message: string): void {
    return this.#element.nativeElement.setCustomValidity(message);
  }
}
