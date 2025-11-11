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
import type { SbbSliderElement } from '@sbb-esta/lyne-elements/slider.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/slider.js';

/**
 * It displays an input knob that can be moved in a range.
 *
 * @slot prefix - Use this slot to render an icon on the left side of the input.
 * @slot suffix - Use this slot to render an icon on the right side of the input.
 */
@Directive({
  selector: 'sbb-slider',
  exportAs: 'sbbSlider',
  host: {
    '(change)': 'this.onChangeFn(this.value)',
    '(blur)': 'this.onTouchedFn()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SbbSlider),
      multi: true,
    },
  ],
})
export class SbbSlider extends SbbControlValueAccessorMixin(class {}) {
  #element: ElementRef<SbbSliderElement> = inject(ElementRef<SbbSliderElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Value of the form element.
   * If no value is provided, default is the middle point between min and max.
   */
  @Input()
  public set value(value: string | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): string | null {
    return this.#element.nativeElement.value;
  }

  /**
   * Numeric value for the inner HTMLInputElement.
   */
  @Input()
  public set valueAsNumber(value: number | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.valueAsNumber = value));
  }
  public get valueAsNumber(): number | null {
    return this.#element.nativeElement.valueAsNumber;
  }

  /**
   * Minimum acceptable value for the inner HTMLInputElement.
   */
  @Input()
  public set min(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.min = value));
  }
  public get min(): string {
    return this.#element.nativeElement.min;
  }

  /**
   * Maximum acceptable value for the inner HTMLInputElement.
   */
  @Input()
  public set max(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.max = value));
  }
  public get max(): string {
    return this.#element.nativeElement.max;
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
   * Name of the icon at component's start, which will be forward to the nested `sbb-icon`.
   */
  @Input()
  public set startIcon(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.startIcon = value));
  }
  public get startIcon(): string {
    return this.#element.nativeElement.startIcon;
  }

  /**
   * Name of the icon at component's end, which will be forward to the nested `sbb-icon`.
   */
  @Input()
  public set endIcon(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.endIcon = value));
  }
  public get endIcon(): string {
    return this.#element.nativeElement.endIcon;
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

  /**
   * Deprecated. Mirrors change event for React. Will be removed once React properly supports change events.
   */
  public didChangeOutput: OutputRef<Event> = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'didChange'),
    { alias: 'didChange' },
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
}
