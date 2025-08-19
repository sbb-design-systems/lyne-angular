import { Directive, ElementRef, forwardRef, inject, Input } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type { SbbOptionBaseElement } from '@sbb-esta/lyne-elements/option/option.js';
import { BehaviorSubject } from 'rxjs';

import type { SbbAutocompleteType } from './autocomplete-type';

@Directive({
  selector: `input[sbbAutocomplete]`,
  exportAs: 'sbbAutocompleteTrigger',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SbbAutocompleteTrigger),
      multi: true,
    },
  ],
  host: {
    '(blur)': '_onTouched()',
    '(input)': '_handleInput($event)',
    '(inputAutocomplete)': '_handleSelected($event)',
  },
})
export class SbbAutocompleteTrigger<T = string> implements ControlValueAccessor {
  #element = inject<ElementRef<HTMLInputElement>>(ElementRef);

  /** BehaviourSubject holding inputValue. Used for highlighting */
  #inputValue = new BehaviorSubject('');

  /** `View -> model callback called when value changes` */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onChange: (value: unknown) => void = () => {};

  /** `View -> model callback called when autocomplete has been touched` */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onTouched: () => void = () => {};

  /** The autocomplete panel to be attached to this trigger. */
  @Input('sbbAutocomplete')
  get autocomplete(): SbbAutocompleteType<T> | null {
    return this.#autocomplete;
  }
  set autocomplete(autocomplete: SbbAutocompleteType<T>) {
    this.#autocomplete = autocomplete;
  }
  #autocomplete: SbbAutocompleteType<T> | null = null;

  // Implemented as part of ControlValueAccessor.
  writeValue(value: T): void {
    Promise.resolve(null).then(() => {
      // Given a value, returns the string that should be shown within the input.
      const toDisplay = this.autocomplete?.displayWith?.(value) ?? value;

      // Simply falling back to an empty string if the display value is falsy does not work properly.
      // The display value can also be the number zero and shouldn't fall back to an empty string.
      this.#element.nativeElement.value = toDisplay != null ? (toDisplay as string) : '';
      this.#element.nativeElement.dispatchEvent(
        new Event('change', { bubbles: true, composed: true }),
      );

      this.#inputValue.next(this.#element.nativeElement.value);
    });
  }

  // Implemented as part of ControlValueAccessor.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  registerOnChange(fn: (value: unknown) => {}): void {
    this._onChange = fn;
  }

  // Implemented as part of ControlValueAccessor.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  registerOnTouched(fn: () => {}) {
    this._onTouched = fn;
  }

  // Implemented as part of ControlValueAccessor.
  setDisabledState(isDisabled: boolean) {
    this.#element.nativeElement.disabled = isDisabled;
  }

  _handleInput(event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    let value: number | string | null = target.value;

    // Based on `NumberValueAccessor` from forms.
    if (target.type === 'number') {
      value = value === '' ? null : parseFloat(value);
    }

    this._onChange(value);
    this.#inputValue.next(target.value);
  }

  _handleSelected(event: CustomEvent<{ option: SbbOptionBaseElement<T> }>): void {
    // We have to check if the option is selected
    // and if so, we have to set the input value to the display value.
    // This is needed for the autocomplete to work properly
    // and to show the correct value in the input field.
    this._onChange(event.detail.option.value);
  }
}
