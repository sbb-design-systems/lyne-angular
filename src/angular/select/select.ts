import { Directive, ElementRef, forwardRef, inject, Input, NgZone } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  booleanAttribute,
  internalOutputFromObservable,
  SbbControlValueAccessorMixin,
} from '@sbb-esta/lyne-angular/core';
import type { SbbSelectElement } from '@sbb-esta/lyne-elements/select.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/select.js';

/**
 * It displays a panel with selectable options.
 *
 * @slot  - Use the unnamed slot to add options.
 * @cssprop [--sbb-select-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order, the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
@Directive({
  selector: 'sbb-select',
  exportAs: 'sbbSelect',
  host: {
    '(change)': 'this.onChangeFn(this.value)',
    '(blur)': 'this.onTouchedFn()',
    '(close)': 'this.onTouchedFn()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SbbSelect),
      multi: true,
    },
  ],
})
export class SbbSelect<T = string> extends SbbControlValueAccessorMixin(class {}) {
  #element: ElementRef<SbbSelectElement<T>> = inject(ElementRef<SbbSelectElement<T>>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Size variant, either m or s.
   */
  @Input()
  public set size(value: 'm' | 's') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'm' | 's' {
    return this.#element.nativeElement.size;
  }

  /**
   * The placeholder used if no value has been selected.
   */
  @Input()
  public set placeholder(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.placeholder = value));
  }
  public get placeholder(): string {
    return this.#element.nativeElement.placeholder;
  }

  /**
   * Whether the select allows for multiple selection.
   */
  @Input({ transform: booleanAttribute })
  public set multiple(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.multiple = value));
  }
  public get multiple(): boolean {
    return this.#element.nativeElement.multiple;
  }

  /**
   * Whether the component is readonly.
   */
  @Input({ transform: booleanAttribute })
  public set readOnly(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.readOnly = value));
  }
  public get readOnly(): boolean {
    return this.#element.nativeElement.readOnly;
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
   * Value of the form element.
   */
  @Input()
  public set value(value: T | T[] | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): T | T[] | null {
    return this.#element.nativeElement.value;
  }

  /**
   * Form type of element.
   */
  public get type(): string {
    return this.#element.nativeElement.type;
  }

  /**
   * Returns the form owner of this element.
   */
  public get form(): HTMLFormElement | null {
    return this.#element.nativeElement.form;
  }

  /**
   * Whether the element is open.
   */
  public get isOpen(): boolean {
    return this.#element.nativeElement.isOpen;
  }

  /**
   * Opens the selection panel.
   */
  public open(): void {
    return this.#element.nativeElement.open();
  }

  /**
   * Closes the selection panel.
   */
  public close(): void {
    return this.#element.nativeElement.close();
  }

  /**
   * Gets the current displayed value.
   */
  public getDisplayValue(): string {
    return this.#element.nativeElement.getDisplayValue();
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

  protected _inputOutput = outputFromObservable<InputEvent>(NEVER, { alias: 'input' });
  /**
   * The input event fires when the value has been changed as a direct result of a user action.
   */
  public inputOutput = internalOutputFromObservable(
    fromEvent<InputEvent>(this.#element.nativeElement, 'input'),
  );

  protected _changeOutput = outputFromObservable<Event>(NEVER, { alias: 'change' });
  /**
   * The change event is fired when the user modifies the element's value.
   * Unlike the input event, the change event is not necessarily fired
   * for each alteration to an element's value.
   */
  public changeOutput = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'change'),
  );

  /**
   * Emits whenever the component starts the opening transition. Can be canceled.
   */
  public beforeOpenOutput = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeopen'),
    { alias: 'beforeOpen' },
  );

  protected _openOutput = outputFromObservable<Event>(NEVER, { alias: 'open' });
  /**
   * Emits whenever the component is opened.
   */
  public openOutput = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'open'),
  );

  /**
   * Emits whenever the component begins the closing transition. Can be canceled.
   */
  public beforeCloseOutput = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeclose'),
    { alias: 'beforeClose' },
  );

  protected _closeOutput = outputFromObservable<Event>(NEVER, { alias: 'close' });
  /**
   * Emits whenever the component is closed.
   */
  public closeOutput = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'close'),
  );

  /**
   * The method which is called on escape key press. Defaults to calling close()
   */
  public escapeStrategy(): void {
    return this.#element.nativeElement.escapeStrategy();
  }
}
