import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbToggleOptionElement } from '@sbb-esta/lyne-elements/toggle/toggle-option.js';

import '@sbb-esta/lyne-elements/toggle/toggle-option.js';

/**
 * It displays a toggle option within a `sbb-toggle`.
 *
 * @slot  - Use the unnamed slot to add content to the label of the toggle option.
 * @slot icon - Slot used to render the `sbb-icon`.
 */
@Directive({
  selector: 'sbb-toggle-option',
  exportAs: 'sbbToggleOption',
})
export class SbbToggleOption<T = string> {
  #element: ElementRef<SbbToggleOptionElement<T>> = inject(ElementRef<SbbToggleOptionElement<T>>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Whether the toggle-option is checked.
   */
  @Input({ transform: booleanAttribute })
  public set checked(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.checked = value));
  }
  public get checked(): boolean {
    return this.#element.nativeElement.checked;
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
   * Value of toggle-option.
   */
  @Input()
  public set value(value: T | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): T | null {
    return this.#element.nativeElement.value;
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
}
