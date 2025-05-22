import { Directive, ElementRef, forwardRef, inject, Input, NgZone, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { booleanAttribute, SbbControlValueAccessorMixin } from '@sbb-esta/lyne-angular/core';
import type {
  SbbChipGroupElement,
  SbbChipInputTokenEndEventDetails,
} from '@sbb-esta/lyne-elements/chip/chip-group.js';
import { fromEvent, NEVER, type Observable } from 'rxjs';

import '@sbb-esta/lyne-elements/chip/chip-group.js';

@Directive({
  selector: 'sbb-chip-group',
  exportAs: 'sbbChipGroup',
  host: {
    '(change)': 'this.onChangeFn(this.value)',
    '(focusout)': 'this.onTouchedFn()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SbbChipGroup),
      multi: true,
    },
  ],
})
export class SbbChipGroup<T = string> extends SbbControlValueAccessorMixin(class {}) {
  #element: ElementRef<SbbChipGroupElement<T>> = inject(ElementRef<SbbChipGroupElement<T>>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set value(value: (T | null)[] | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): (T | null)[] | null {
    return this.#element.nativeElement.value;
  }

  @Input()
  public set separatorKeys(value: string[]) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.separatorKeys = value));
  }
  public get separatorKeys(): string[] {
    return this.#element.nativeElement.separatorKeys;
  }

  @Input({ transform: booleanAttribute })
  public set required(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.required = value));
  }
  public get required(): boolean {
    return this.#element.nativeElement.required;
  }

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

  @Input()
  public set name(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.name = value));
  }
  public get name(): string {
    return this.#element.nativeElement.name;
  }

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output('change') protected _change: (typeof this)['change'] = NEVER;
  public change: Observable<CustomEvent<void>> = fromEvent<CustomEvent<void>>(
    this.#element.nativeElement,
    'change',
  );

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output('input') protected _input: (typeof this)['input'] = NEVER;
  public input: Observable<CustomEvent<void>> = fromEvent<CustomEvent<void>>(
    this.#element.nativeElement,
    'input',
  );

  @Output('chipInputTokenEnd') protected _chipInputTokenEnd: (typeof this)['chipInputTokenEnd'] =
    NEVER;
  public chipInputTokenEnd: Observable<CustomEvent<SbbChipInputTokenEndEventDetails>> = fromEvent<
    CustomEvent<SbbChipInputTokenEndEventDetails>
  >(this.#element.nativeElement, 'chipInputTokenEnd');

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

  @Input()
  public set displayWith(value: ((value: T) => string) | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.displayWith = value));
  }
  public get displayWith(): ((value: T) => string) | null {
    return this.#element.nativeElement.displayWith;
  }
}
