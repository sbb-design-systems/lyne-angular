import { FocusMonitor } from '@angular/cdk/a11y';
import {
  type AfterViewInit,
  Directive,
  ElementRef,
  forwardRef,
  inject,
  Input,
  NgZone,
} from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  booleanAttribute,
  internalOutputFromObservable,
  SbbControlValueAccessorMixin,
  SbbDeferredAnimation,
} from '@sbb-esta/lyne-angular/core';
import type { SbbTagElement, SbbTagSize } from '@sbb-esta/lyne-elements/tag/tag.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/tag/tag.js';

/**
 * It displays a selectable element which can be used as a filter.
 *
 * @slot  - Use the unnamed slot to add content to the tag label.
 * @slot icon - Use this slot to display an icon at the component start, by providing a `sbb-icon` component.
 * @slot amount - Provide an amount to show it at the component end.
 */
@Directive({
  selector: 'sbb-tag',
  exportAs: 'sbbTag',
  host: {
    '(change)': 'this.onChangeFn(this.checked)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SbbTag),
      multi: true,
    },
  ],
  hostDirectives: [SbbDeferredAnimation],
})
export class SbbTag<T = string>
  extends SbbControlValueAccessorMixin(class {})
  implements AfterViewInit
{
  #element: ElementRef<SbbTagElement<T>> = inject(ElementRef<SbbTagElement<T>>);
  #ngZone: NgZone = inject(NgZone);
  #focusMonitor = inject(FocusMonitor);

  /**
   * Amount displayed inside the tag.
   */
  @Input()
  public set amount(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.amount = value));
  }
  public get amount(): string {
    return this.#element.nativeElement.amount;
  }

  /**
   * Whether the tag is checked.
   */
  @Input({ transform: booleanAttribute })
  public set checked(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.checked = value));
  }
  public get checked(): boolean {
    return this.#element.nativeElement.checked;
  }

  /**
   * Tag size, either s or m.
   */
  @Input()
  public set size(value: SbbTagSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbTagSize {
    return this.#element.nativeElement.size;
  }

  /**
   * The icon name we want to use, choose from the small icon variants
   * from the ui-icons category from here
   * https://icons.app.sbb.ch.
   */
  @Input()
  public set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public get iconName(): string {
    return this.#element.nativeElement.iconName;
  }

  /**
   * Whether the button should be aria-disabled but stay interactive.
   */
  @Input({ transform: booleanAttribute })
  public set disabledInteractive(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabledInteractive = value));
  }
  public get disabledInteractive(): boolean {
    return this.#element.nativeElement.disabledInteractive;
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
   * Value of the form element.
   */
  @Input()
  public set value(value: T | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): T | null {
    return this.#element.nativeElement.value;
  }

  /**
   * Returns the form owner of this element.
   */
  public get form(): HTMLFormElement | null {
    return this.#element.nativeElement.form;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override writeValue(value: any): void {
    this.checked = !!value;
  }

  ngAfterViewInit() {
    this.#focusMonitor.monitor(this.#element, true).subscribe((focusOrigin) => {
      if (!focusOrigin) {
        // When a focused element becomes disabled, the browser *immediately* fires a blur event.
        // Angular does not expect events to be raised during change detection, so any state change
        // (such as a form control's 'ng-touched') will cause a changed-after-checked error.
        // See https://github.com/angular/angular/issues/17793. To work around this, we defer
        // telling the form control it has been touched until the next tick.
        Promise.resolve().then(() => {
          this.onTouchedFn();
        });
      }
    });
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
   * Deprecated. Mirrors change event for React. Will be removed once React properly supports change events.
   */
  public didChangeOutput = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'didChange'),
    { alias: 'didChange' },
  );
}
