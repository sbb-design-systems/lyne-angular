import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbMiniButtonElement } from '@sbb-esta/lyne-elements/button/mini-button.js';
import type { SbbButtonType } from '@sbb-esta/lyne-elements/core/base-elements.js';

import '@sbb-esta/lyne-elements/button/mini-button.js';

/**
 * It displays an icon-only button enhanced with the SBB Design;
it's meant to be used mainly within the sbb-form-field in prefix/suffix slot.
 *
 * @slot  - Use the unnamed slot to add a label to the mini-button.
 * @slot icon - Slot used to display the icon, if one is set
 */
@Directive({
  selector: 'sbb-mini-button',
  exportAs: 'sbbMiniButton',
})
export class SbbMiniButton {
  #element: ElementRef<SbbMiniButtonElement> = inject(ElementRef<SbbMiniButtonElement>);
  #ngZone: NgZone = inject(NgZone);

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
   * The `<form>` element to associate the button with.
   */
  @Input()
  public set form(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.form = value));
  }
  public get form(): HTMLFormElement | null {
    return this.#element.nativeElement.form;
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
  public set value(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): string {
    return this.#element.nativeElement.value;
  }

  /**
   * The type attribute to use for the button.
   */
  @Input()
  public set type(value: SbbButtonType) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.type = value));
  }
  public get type(): SbbButtonType {
    return this.#element.nativeElement.type;
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
}
