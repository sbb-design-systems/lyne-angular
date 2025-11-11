import { Directive, ElementRef, inject, Input, NgZone, type OutputRef } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute, internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbAutocompleteElement } from '@sbb-esta/lyne-elements/autocomplete.js';
import { fromEvent, NEVER } from 'rxjs';

import type { SbbAutocompleteType } from './autocomplete-type';

import '@sbb-esta/lyne-elements/autocomplete.js';

/**
 * Combined with a native input, it displays a panel with a list of available options.
 *
 * @slot  - Use the unnamed slot to add `sbb-option` or `sbb-optgroup` elements to the `sbb-autocomplete`.
 * @cssprop [--sbb-autocomplete-z-index=var(--sbb-overlay-default-z-index)] - To specify a custom stack order, the `z-index` can be overridden by defining this CSS variable. The default `z-index` of the component is set to `var(--sbb-overlay-default-z-index)` with a value of `1000`.
 */
@Directive({
  selector: 'sbb-autocomplete',
  exportAs: 'sbbAutocomplete',
})
export class SbbAutocomplete<T = string> implements SbbAutocompleteType<T> {
  #element: ElementRef<SbbAutocompleteElement<T>> = inject(ElementRef<SbbAutocompleteElement<T>>);
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
   * The element where the autocomplete will attach.
   * If not set, as fallback there are two elements which can act as origin with following priority order:
   * 1. `sbb-form-field` if it is an ancestor.
   * 2. trigger element if set.
   *
   * For attribute usage, provide an id reference.
   */
  @Input()
  public set origin(value: string | HTMLElement | null) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.origin = value as HTMLElement | null),
    );
  }
  public get origin(): HTMLElement | null {
    return this.#element.nativeElement.origin;
  }

  /**
   * The input element that will trigger the autocomplete opening.
   * By default, the autocomplete will open on focus, click, input or `ArrowDown` keypress of the 'trigger' element.
   * If not set, will search for the first 'input' child of a 'sbb-form-field' ancestor.
   *
   * For attribute usage, provide an id reference.
   */
  @Input()
  public set trigger(value: string | HTMLInputElement | null) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.trigger = value as HTMLInputElement | null),
    );
  }
  public get trigger(): HTMLInputElement | null {
    return this.#element.nativeElement.trigger;
  }

  /**
   * Whether the icon space is preserved when no icon is set.
   */
  @Input({ transform: booleanAttribute })
  public set preserveIconSpace(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.preserveIconSpace = value));
  }
  public get preserveIconSpace(): boolean {
    return this.#element.nativeElement.preserveIconSpace;
  }

  /**
   * Whether the active option should be selected as the user is navigating.
   */
  @Input({ transform: booleanAttribute })
  public set autoSelectActiveOption(value: boolean) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.autoSelectActiveOption = value),
    );
  }
  public get autoSelectActiveOption(): boolean {
    return this.#element.nativeElement.autoSelectActiveOption;
  }

  /**
   * Whether the user is required to make a selection when they're interacting with the
   * autocomplete. If the user moves away from the autocomplete without selecting an option from
   * the list, the value will be reset. If the user opens the panel and closes it without
   * interacting or selecting a value, the initial value will be kept.
   */
  @Input({ transform: booleanAttribute })
  public set requireSelection(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.requireSelection = value));
  }
  public get requireSelection(): boolean {
    return this.#element.nativeElement.requireSelection;
  }

  /**
   * The position of the autocomplete panel relative to the trigger.
   */
  @Input()
  public set position(value: 'auto' | 'above' | 'below') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.position = value));
  }
  public get position(): 'auto' | 'above' | 'below' {
    return this.#element.nativeElement.position;
  }

  /**
   * Whether the first option is automatically activated when the autocomplete is opened.
   */
  @Input({ transform: booleanAttribute })
  public set autoActiveFirstOption(value: boolean) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.autoActiveFirstOption = value),
    );
  }
  public get autoActiveFirstOption(): boolean {
    return this.#element.nativeElement.autoActiveFirstOption;
  }

  /**
   * Function that maps an option's control value to its display value in the trigger.
   */
  @Input()
  public set displayWith(value: ((value: T) => string) | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.displayWith = value));
  }
  public get displayWith(): ((value: T) => string) | null {
    return this.#element.nativeElement.displayWith;
  }

  /**
   * Returns the element where autocomplete overlay is attached to.
   */
  public get originElement(): HTMLElement | null {
    return this.#element.nativeElement.originElement;
  }

  /**
   * Returns the trigger element.
   */
  public get triggerElement(): HTMLInputElement | null | undefined {
    return this.#element.nativeElement.triggerElement;
  }

  /**
   * Whether the element is open.
   */
  public get isOpen(): boolean {
    return this.#element.nativeElement.isOpen;
  }

  /**
   * Opens the autocomplete.
   */
  public open(): void {
    return this.#element.nativeElement.open();
  }

  /**
   * Closes the autocomplete.
   */
  public close(): void {
    return this.#element.nativeElement.close();
  }

  /**
   * Emits whenever the component starts the opening transition. Can be canceled.
   */
  public beforeOpenOutput: OutputRef<Event> = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeopen'),
    { alias: 'beforeOpen' },
  );

  protected _openOutput: OutputRef<Event> = outputFromObservable<Event>(NEVER, { alias: 'open' });
  /**
   * Emits whenever the component is opened.
   */
  public openOutput: OutputRef<Event> = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'open'),
  );

  /**
   * Emits whenever the component begins the closing transition. Can be canceled.
   */
  public beforeCloseOutput: OutputRef<Event> = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeclose'),
    { alias: 'beforeClose' },
  );

  protected _closeOutput: OutputRef<Event> = outputFromObservable<Event>(NEVER, { alias: 'close' });
  /**
   * Emits whenever the component is closed.
   */
  public closeOutput: OutputRef<Event> = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'close'),
  );

  public optionSelected: OutputRef<Event> = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'optionselected'),
    { alias: 'optionSelected' },
  );

  /**
   * The method which is called on escape key press. Defaults to calling close()
   */
  public escapeStrategy(): void {
    return this.#element.nativeElement.escapeStrategy();
  }
}
