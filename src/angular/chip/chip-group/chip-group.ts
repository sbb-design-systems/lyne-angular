import {
  Directive,
  ElementRef,
  forwardRef,
  inject,
  Input,
  NgZone,
  type OutputRef,
} from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  booleanAttribute,
  internalOutputFromObservable,
  SbbControlValueAccessorMixin,
} from '@sbb-esta/lyne-angular/core';
import type {
  SbbChipGroupElement,
  SbbChipInputTokenEndEventDetails,
} from '@sbb-esta/lyne-elements/chip/chip-group.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/chip/chip-group.js';

/**
 * The `sbb-chip-group` component is used as a container for one or multiple `sbb-chip`.
 *
 * @slot  - Use the unnamed slot to add `sbb-chip` elements.
 */
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

  /**
   * Value of the form element.
   */
  @Input()
  public set value(value: (T | null)[] | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): (T | null)[] | null {
    return this.#element.nativeElement.value;
  }

  /**
   * The array of keys that will trigger a `chipinputtokenend` event. Default `['Enter']`
   */
  @Input()
  public set separatorKeys(value: string[]) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.separatorKeys = value));
  }
  public get separatorKeys(): string[] {
    return this.#element.nativeElement.separatorKeys;
  }

  /**
   * Whether the component is required.
   */
  @Input({ transform: booleanAttribute })
  public set required(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.required = value));
  }
  public get required(): boolean {
    return this.#element.nativeElement.required;
  }

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
   * Name of the form element. Will be read from name attribute.
   */
  @Input()
  public set name(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.name = value));
  }
  public get name(): string {
    return this.#element.nativeElement.name;
  }

  /**
   * Returns the form owner of this element.
   */
  public get form(): HTMLFormElement | null {
    return this.#element.nativeElement.form;
  }

  /**
   * Returns the ValidityState object for this element.
   */
  public get validity(): ValidityState {
    return this.#element.nativeElement.validity;
  }

  /**
   * Returns the current error message, if available, which corresponds
   * to the current validation state.
   * Please note that only one message is returned at a time (e.g. if
   * multiple validity states are invalid, only the chronologically first one
   * is returned until it is fixed, at which point the next message might be
   * returned, if it is still applicable). Also a custom validity message
   * (see below) has precedence over native validation messages.
   */
  public get validationMessage(): string {
    return this.#element.nativeElement.validationMessage;
  }

  /**
   * Returns true if this element will be validated
   * when the form is submitted; false otherwise.
   */
  public get willValidate(): boolean {
    return this.#element.nativeElement.willValidate;
  }

  /**
   * Returns true if this element has no validity problems; false otherwise.
   * Fires an invalid event at the element in the latter case.
   */
  public checkValidity(): boolean {
    return this.#element.nativeElement.checkValidity();
  }

  /**
   * Returns true if this element has no validity problems; otherwise,
   * returns false, fires an invalid event at the element,
   * and (if the event isn't canceled) reports the problem to the user.
   */
  public reportValidity(): boolean {
    return this.#element.nativeElement.reportValidity();
  }

  /**
   * Sets the custom validity message for this element. Use the empty string
   * to indicate that the element does not have a custom validity error.
   */
  public setCustomValidity(message: string): void {
    return this.#element.nativeElement.setCustomValidity(message);
  }

  /**
   * Function that maps a chip's value to its display value.
   */
  @Input()
  public set displayWith(value: ((value: T) => string) | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.displayWith = value));
  }
  public get displayWith(): ((value: T) => string) | null {
    return this.#element.nativeElement.displayWith;
  }

  /**
   * Notifies that a chip is about to be created. Can be prevented.
   */
  public chipInputTokenEndOutput: OutputRef<CustomEvent<SbbChipInputTokenEndEventDetails>> =
    outputFromObservable(
      fromEvent<CustomEvent<SbbChipInputTokenEndEventDetails>>(
        this.#element.nativeElement,
        'chipinputtokenend',
      ),
      { alias: 'chipInputTokenEnd' },
    );

  protected _inputOutput: OutputRef<InputEvent> = outputFromObservable<InputEvent>(NEVER, {
    alias: 'input',
  });
  /**
   * The input event fires when the value has been changed as a direct result of a user action.
   */
  public inputOutput: OutputRef<InputEvent> = internalOutputFromObservable(
    fromEvent<InputEvent>(this.#element.nativeElement, 'input'),
  );

  protected _changeOutput: OutputRef<Event> = outputFromObservable<Event>(NEVER, {
    alias: 'change',
  });
  /**
   * The change event is fired when the user modifies the element's value.
   * Unlike the input event, the change event is not necessarily fired
   * for each alteration to an element's value.
   */
  public changeOutput: OutputRef<Event> = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'change'),
  );
}
