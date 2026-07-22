import {
  contentChild,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  inject,
  Input,
  isSignal,
  NgZone,
} from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import {
  SbbFormFieldControlEvent,
  SbbFormFieldElement,
  type SbbFormFieldElementControl,
} from '@sbb-esta/lyne-elements/form-field.pure.js';
import { type Subscription } from 'rxjs';

import { SbbFormFieldControl } from './form-field-control';

/**
 * It wraps an input element adding label, errors, icon, etc.
 *
 * @slot  - Use this slot to render an input/select or a supported non-native element.
 * @slot label - Use this slot to render a label.
 * @slot prefix - Use this slot to render an icon on the left side of the input.
 * @slot suffix - Use this slot to render an icon on the right side of the input.
 * @slot error - Use this slot to render an error.
 * @slot hint - Use this slot to render an `<sbb-hint>` or an `<sbb-form-field-text-counter>` element.
 * @cssprop [--sbb-form-field-outline-offset=undefined] - To override the focus outline offset,
 * @cssprop [--sbb-form-field-focus-underline-z-index=undefined] - To override the z-index of the focus underline effect,
 */
@Directive({
  selector: 'sbb-form-field',
  exportAs: 'sbbFormField',
})
export class SbbFormField {
  static {
    SbbFormFieldElement.define();
  }

  #element: ElementRef<SbbFormFieldElement> = inject(ElementRef<SbbFormFieldElement>);
  #ngZone: NgZone = inject(NgZone);
  #stateChangesSubscription = new Map<SbbFormFieldControl, Subscription>();
  // Must not be ES private, as Angular does not support this for contentChild.
  private control = contentChild(SbbFormFieldControl, { descendants: true });
  private formField = contentChild(FormField, { descendants: true });

  constructor() {
    // To support custom controls, we query for an optional implementation
    // of the SbbFormFieldControl, which we then use to dispatch an
    // SbbFormFieldControlEvent event whenever the custom control has a
    // state change.
    inject(DestroyRef).onDestroy(() => this.#unsubscribeStateChanges());
    const emptyValues = [undefined, null, ''];
    effect(() => {
      const control = this.control();
      if (control) {
        if (!this.#stateChangesSubscription.has(control)) {
          this.#unsubscribeStateChanges();
          this.#stateChangesSubscription.set(
            control,
            control.stateChanges.subscribe(() => this.#dispatchControlEvent(control)),
          );
        }
        return;
      }

      const formField = this.formField();
      const state = formField?.state();
      if (!formField || !state) {
        this.#dispatchControlEvent(null);
        return;
      }

      const element = formField.element;
      const type =
        ('type' in state ? (isSignal(state.type) ? state.type() : state.type) : undefined) ??
        (element as unknown as { type: string }).type;

      this.#element.nativeElement?.dispatchEvent(
        new SbbFormFieldControlEvent({
          element,
          disabled: state.disabled(),
          empty: emptyValues.includes(state.controlValue()),
          readOnly: state.readonly(),
          type: type ? String(type) : undefined,
          invalid: state.invalid(),
          interacted: state.touched(),
          onContainerClick: () => formField.focus(),
        }),
      );
    });
  }

  /**
   * Whether to reserve space for an error message, hint or text-counter.
   * `none` does not reserve any space.
   * `reserve` does reserve one row for an error message.
   */
  @Input()
  public set errorSpace(value: 'none' | 'reserve') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.errorSpace = value));
  }
  public get errorSpace(): 'none' | 'reserve' {
    return this.#element.nativeElement.errorSpace;
  }

  /**
   * Size variant, either s (lean theme default), m (standard theme default) or l.
   */
  @Input()
  public set size(value: 'l' | 'm' | 's' | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'l' | 'm' | 's' | null {
    return this.#element.nativeElement.size;
  }

  /**
   * Whether to display the form field without a border.
   */
  @Input({ transform: booleanAttribute })
  public set borderless(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.borderless = value));
  }
  public get borderless(): boolean {
    return this.#element.nativeElement.borderless;
  }

  /**
   * Defines the width of the component:
   * - `default`: the component has defined width and min-width;
   * - `collapse`: the component adapts itself to its inner input content.
   */
  @Input()
  public set width(value: 'default' | 'collapse') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.width = value));
  }
  public get width(): 'default' | 'collapse' {
    return this.#element.nativeElement.width;
  }

  /**
   * Whether to visually hide the label. If hidden, screen readers will still read it.
   */
  @Input({ transform: booleanAttribute })
  public set hiddenLabel(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hiddenLabel = value));
  }
  public get hiddenLabel(): boolean {
    return this.#element.nativeElement.hiddenLabel;
  }

  /**
   * Whether the label should float. If activated, the placeholder of the input is hidden.
   */
  @Input({ transform: booleanAttribute })
  public set floatingLabel(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.floatingLabel = value));
  }
  public get floatingLabel(): boolean {
    return this.#element.nativeElement.floatingLabel;
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
   * Returns the input element.
   */
  public get inputElement(): HTMLInputElement | HTMLSelectElement | HTMLElement | null {
    return this.#element.nativeElement.inputElement;
  }

  /**
   * Manually reset the form field. Currently, this only resets the floating label.
   */
  public reset(): void {
    return this.#element.nativeElement.reset();
  }

  /**
   * Manually clears the input value. It only works for inputs, selects are not supported.
   */
  public clear(): void {
    return this.#element.nativeElement.clear();
  }

  /**
   * Reference to the slotted label.
   */
  public get label(): HTMLLabelElement | null {
    return this.#element.nativeElement.label;
  }

  #dispatchControlEvent(control: SbbFormFieldElementControl | null): void {
    this.#element.nativeElement?.dispatchEvent(new SbbFormFieldControlEvent(control));
  }

  #unsubscribeStateChanges(): void {
    this.#stateChangesSubscription.forEach((s) => s.unsubscribe());
    this.#stateChangesSubscription.clear();
  }
}
