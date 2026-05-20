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
import { booleanAttribute, SbbControlValueAccessorMixin } from '@sbb-esta/lyne-angular/core';
import type { SbbHorizontalFrom } from '@sbb-esta/lyne-elements/core.js';
import type { SbbRadioButtonGroupElement } from '@sbb-esta/lyne-elements/radio-button-group.js';
import type { SbbRadioButtonPanelElement } from '@sbb-esta/lyne-elements/radio-button-panel.js';
import type { SbbRadioButtonElement } from '@sbb-esta/lyne-elements/radio-button.js';
import { fromEvent } from 'rxjs';

import '@sbb-esta/lyne-elements/radio-button-group.js';

/**
 * It can be used as a container for radio button elements.
 *
 * @slot  - Use the unnamed slot to add `sbb-radio-button`, `sbb-radio-button-panel`, `sbb-selection-action-panel` and `sbb-selection-expansion-panel` elements to the `sbb-radio-button-group`.
 * @slot error - Use this to provide a `sbb-error` to show an error message.
 */
@Directive({
  selector: 'sbb-radio-button-group',
  exportAs: 'sbbRadioButtonGroup',
  host: {
    '(change)': 'this.onChangeFn(this.value)',
    '(focusout)': 'this.onTouchedFn()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SbbRadioButtonGroup),
      multi: true,
    },
  ],
})
export class SbbRadioButtonGroup<T = string> extends SbbControlValueAccessorMixin(class {}) {
  #element: ElementRef<SbbRadioButtonGroupElement<T>> = inject(
    ElementRef<SbbRadioButtonGroupElement<T>>,
  );
  #ngZone: NgZone = inject(NgZone);

  /**
   * Whether the radios can be deselected.
   */
  @Input({ transform: booleanAttribute })
  public set allowEmptySelection(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.allowEmptySelection = value));
  }
  public get allowEmptySelection(): boolean {
    return this.#element.nativeElement.allowEmptySelection;
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
   * The value of the radio group.
   */
  @Input()
  public set value(value: T | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): T | null {
    return this.#element.nativeElement.value;
  }

  /**
   * Size variant, either xs (lean theme default), s or m (standard theme default).
   */
  @Input()
  public set size(value: 'xs' | 's' | 'm' | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'xs' | 's' | 'm' | null {
    return this.#element.nativeElement.size;
  }

  /**
   * Overrides the behavior of `orientation` property.
   */
  @Input()
  public set horizontalFrom(value: SbbHorizontalFrom | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.horizontalFrom = value));
  }
  public get horizontalFrom(): SbbHorizontalFrom | null {
    return this.#element.nativeElement.horizontalFrom;
  }

  /**
   * Indicates the orientation of the checkboxes or panels inside the group.
   */
  @Input()
  public set orientation(value: 'horizontal' | 'vertical') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.orientation = value));
  }
  public get orientation(): 'horizontal' | 'vertical' {
    return this.#element.nativeElement.orientation;
  }

  /**
   * Name for the group. Will be propagated to the child radio buttons. Must be unique if multiple groups are used on the same page.
   */
  @Input()
  public set name(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.name = value));
  }
  public get name(): string {
    return this.#element.nativeElement.name;
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
   * List of contained radio buttons.
   */
  public get radioButtons(): (SbbRadioButtonElement<T> | SbbRadioButtonPanelElement<T>)[] {
    return this.#element.nativeElement.radioButtons;
  }

  /**
   * Deprecated. Mirrors change event for React. Will be removed once React properly supports change events.
   */
  public didChangeOutput: OutputRef<Event> = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'didChange'),
    { alias: 'didChange' },
  );
}
