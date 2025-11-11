import { Directive, ElementRef, inject, Input, NgZone, type OutputRef } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute, internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { CalendarView } from '@sbb-esta/lyne-elements/calendar.js';
import type { SbbDateInputElement } from '@sbb-esta/lyne-elements/date-input.js';
import type { SbbDatepickerElement } from '@sbb-esta/lyne-elements/datepicker/datepicker.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/datepicker/datepicker.js';

/**
 * A datepicker component that allows users to select a date from a calendar view.
 */
@Directive({
  selector: 'sbb-datepicker',
  exportAs: 'sbbDatepicker',
})
export class SbbDatepicker<T = Date> {
  #element: ElementRef<SbbDatepickerElement<T>> = inject(ElementRef<SbbDatepickerElement<T>>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * If set to true, two months are displayed.
   */
  @Input({ transform: booleanAttribute })
  public set wide(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.wide = value));
  }
  public get wide(): boolean {
    return this.#element.nativeElement.wide;
  }

  /**
   * Reference to the sbb-date-input instance or the native input connected to the datepicker.
   *
   * For attribute usage, provide an id reference.
   */
  @Input()
  public set input(value: string | SbbDateInputElement<T> | null) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.input = value as SbbDateInputElement<T> | null),
    );
  }
  public get input(): SbbDateInputElement<T> | null {
    return this.#element.nativeElement.input;
  }

  /**
   * The initial view of calendar which should be displayed on opening.
   */
  @Input()
  public set view(value: CalendarView) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.view = value));
  }
  public get view(): CalendarView {
    return this.#element.nativeElement.view;
  }

  /**
   * The element that will trigger the popover overlay.
   *
   * For attribute usage, provide an id reference.
   */
  @Input()
  public set trigger(value: string | HTMLElement | null) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.trigger = value as HTMLElement | null),
    );
  }
  public get trigger(): HTMLElement | null {
    return this.#element.nativeElement.trigger;
  }

  /**
   * Whether the element is open.
   */
  public get isOpen(): boolean {
    return this.#element.nativeElement.isOpen;
  }

  /**
   * Opens the popover on trigger click.
   */
  public open(): void {
    return this.#element.nativeElement.open();
  }

  /**
   * Closes the popover.
   */
  public close(target: HTMLElement): void {
    return this.#element.nativeElement.close(target);
  }

  /**
   * Event emitted on date selection.
   */
  public dateSelectedOutput: OutputRef<CustomEvent<T>> = outputFromObservable(
    fromEvent<CustomEvent<T>>(this.#element.nativeElement, 'dateselected'),
    { alias: 'dateSelected' },
  );

  /**
   * Emits whenever the component begins the closing transition. Can be canceled.
   */
  public beforeCloseOutput: OutputRef<CustomEvent<{ closeTarget: HTMLElement | null }>> =
    outputFromObservable(
      fromEvent<CustomEvent<{ closeTarget: HTMLElement | null }>>(
        this.#element.nativeElement,
        'beforeclose',
      ),
      { alias: 'beforeClose' },
    );

  protected _closeOutput: OutputRef<CustomEvent<{ closeTarget: HTMLElement | null }>> =
    outputFromObservable<CustomEvent<{ closeTarget: HTMLElement | null }>>(NEVER, {
      alias: 'close',
    });
  /**
   * Emits whenever the component is closed.
   */
  public closeOutput: OutputRef<CustomEvent<{ closeTarget: HTMLElement | null }>> =
    internalOutputFromObservable(
      fromEvent<CustomEvent<{ closeTarget: HTMLElement | null }>>(
        this.#element.nativeElement,
        'close',
      ),
    );

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
   * The method which is called on escape key press. Defaults to calling close()
   */
  public escapeStrategy(): void {
    return this.#element.nativeElement.escapeStrategy();
  }
}
