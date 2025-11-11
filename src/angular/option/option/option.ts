import { Directive, ElementRef, inject, Input, NgZone, type OutputRef } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbOptionElement } from '@sbb-esta/lyne-elements/option/option.js';
import { fromEvent } from 'rxjs';

import '@sbb-esta/lyne-elements/option/option.js';

/**
 * It displays on option item which can be used in `sbb-select` or `sbb-autocomplete`.
 *
 * @slot  - Use the unnamed slot to add content to the option label.
 * @slot icon - Use this slot to provide an icon. If `icon-name` is set, a sbb-icon will be used.
 * @cssprop [--sbb-option-icon-container-display=none] - Can be used to reserve space even when preserve-icon-space on autocomplete is not set or iconName is not set.
 */
@Directive({
  selector: 'sbb-option',
  exportAs: 'sbbOption',
})
export class SbbOption<T = string> {
  #element: ElementRef<SbbOptionElement<T>> = inject(ElementRef<SbbOptionElement<T>>);
  #ngZone: NgZone = inject(NgZone);

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
   * Value of the option.
   */
  @Input()
  public set value(value: T) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): T {
    return this.#element.nativeElement.value;
  }

  /**
   * Whether the option is selected.
   */
  @Input({ transform: booleanAttribute })
  public set selected(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.selected = value));
  }
  public get selected(): boolean {
    return this.#element.nativeElement.selected;
  }

  /**
   * The optionselectionchange event is dispatched when the option selection status changes.
   */
  public optionSelectionChangeOutput: OutputRef<Event> = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'optionselectionchange'),
    { alias: 'optionSelectionChange' },
  );

  /**
   * Emits when an option was selected by user.
   */
  public optionSelectedOutput: OutputRef<Event> = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'optionselected'),
    { alias: 'optionSelected' },
  );
}
