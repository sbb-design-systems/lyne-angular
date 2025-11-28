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
import type { SbbFileSelectorElement } from '@sbb-esta/lyne-elements/file-selector/file-selector.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/file-selector/file-selector.js';

/**
 * It allows to select one or more file from storage devices and display them.
 *
 * @slot error - Use this to provide a `sbb-error` to show an error message.
 */
@Directive({
  selector: 'sbb-file-selector',
  exportAs: 'sbbFileSelector',
  host: {
    '(change)': 'this.onChangeFn(this.files)',
    '(blur)': 'this.onTouchedFn()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SbbFileSelector),
      multi: true,
    },
  ],
})
export class SbbFileSelector extends SbbControlValueAccessorMixin(class {}) {
  #element: ElementRef<SbbFileSelectorElement> = inject(ElementRef<SbbFileSelectorElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Size variant, either s or m.
   */
  @Input()
  public set size(value: 's' | 'm') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 's' | 'm' {
    return this.#element.nativeElement.size;
  }

  /**
   * Whether more than one file can be selected.
   */
  @Input({ transform: booleanAttribute })
  public set multiple(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.multiple = value));
  }
  public get multiple(): boolean {
    return this.#element.nativeElement.multiple;
  }

  /**
   * Whether the newly added files should override the previously added ones.
   */
  @Input()
  public set multipleMode(value: 'default' | 'persistent') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.multipleMode = value));
  }
  public get multipleMode(): 'default' | 'persistent' {
    return this.#element.nativeElement.multipleMode;
  }

  /**
   * A comma-separated list of allowed unique file type specifiers.
   */
  @Input()
  public set accept(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accept = value));
  }
  public get accept(): string {
    return this.#element.nativeElement.accept;
  }

  /**
   * This will be forwarded as aria-label to the native input element.
   */
  @Input()
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }

  /**
   * The path of the first selected file. Empty string ('') if no file is selected
   */
  @Input()
  public set value(value: string | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): string | null {
    return this.#element.nativeElement.value;
  }

  /**
   * The list of selected files.
   */
  @Input()
  public set files(value: Readonly<File>[]) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.files = value));
  }
  public get files(): Readonly<File>[] {
    return this.#element.nativeElement.files;
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override writeValue(value: any): void {
    this.files = value;
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
   * returned, if it is still applicable). Also, a custom validity message
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

  /**
   * An event which is emitted each time the file list changes.
   */
  public fileChangedOutput: OutputRef<CustomEvent<Readonly<File>[]>> = outputFromObservable(
    fromEvent<CustomEvent<Readonly<File>[]>>(this.#element.nativeElement, 'filechanged'),
    { alias: 'fileChanged' },
  );
}
