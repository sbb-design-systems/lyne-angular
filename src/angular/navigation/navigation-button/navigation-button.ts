import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbButtonType } from '@sbb-esta/lyne-elements/core/base-elements.js';
import type { SbbNavigationButtonElement } from '@sbb-esta/lyne-elements/navigation/navigation-button.js';
import type { SbbNavigationMarkerElement } from '@sbb-esta/lyne-elements/navigation/navigation-marker.js';
import type { SbbNavigationSectionElement } from '@sbb-esta/lyne-elements/navigation/navigation-section.js';
import type { SbbNavigationActionSize } from '@sbb-esta/lyne-elements/navigation.js';

import '@sbb-esta/lyne-elements/navigation/navigation-button.js';

/**
 * It displays a button element that can be used in the `sbb-navigation` component.
 *
 * @slot  - Use the unnamed slot to add content to the `sbb-navigation-button`.
 */
@Directive({
  selector: 'sbb-navigation-button',
  exportAs: 'sbbNavigationButton',
})
export class SbbNavigationButton {
  #element: ElementRef<SbbNavigationButtonElement> = inject(ElementRef<SbbNavigationButtonElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Action size variant, either s, m or l.
   */
  @Input()
  public set size(value: SbbNavigationActionSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbNavigationActionSize {
    return this.#element.nativeElement.size;
  }

  /**
   * The section that is being controlled by the action, if any.
   */
  @Input()
  public set connectedSection(value: SbbNavigationSectionElement | undefined) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.connectedSection = value));
  }
  public get connectedSection(): SbbNavigationSectionElement | undefined {
    return this.#element.nativeElement.connectedSection;
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
   * The navigation marker in which the action is nested.
   */
  public get marker(): SbbNavigationMarkerElement | null {
    return this.#element.nativeElement.marker;
  }

  /**
   * The section in which the action is nested.
   */
  public get section(): SbbNavigationSectionElement | null {
    return this.#element.nativeElement.section;
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
}
