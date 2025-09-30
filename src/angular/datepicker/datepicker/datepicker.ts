import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute, internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { CalendarView } from '@sbb-esta/lyne-elements/calendar.js';
import type { SbbDateInputElement } from '@sbb-esta/lyne-elements/date-input.js';
import type { SbbDatepickerElement } from '@sbb-esta/lyne-elements/datepicker/datepicker.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/datepicker/datepicker.js';

@Directive({
  selector: 'sbb-datepicker',
  exportAs: 'sbbDatepicker',
})
export class SbbDatepicker<T = Date> {
  #element: ElementRef<SbbDatepickerElement<T>> = inject(ElementRef<SbbDatepickerElement<T>>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set wide(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.wide = value));
  }
  public get wide(): boolean {
    return this.#element.nativeElement.wide;
  }

  @Input()
  public set input(value: string | SbbDateInputElement<T> | null) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.input = value as SbbDateInputElement<T> | null),
    );
  }
  public get input(): SbbDateInputElement<T> | null {
    return this.#element.nativeElement.input;
  }

  @Input()
  public set view(value: CalendarView) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.view = value));
  }
  public get view(): CalendarView {
    return this.#element.nativeElement.view;
  }

  @Input()
  public set trigger(value: string | HTMLElement | null) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.trigger = value as HTMLElement | null),
    );
  }
  public get trigger(): HTMLElement | null {
    return this.#element.nativeElement.trigger;
  }

  public get isOpen(): boolean {
    return this.#element.nativeElement.isOpen;
  }

  public open(): void {
    return this.#element.nativeElement.open();
  }

  public close(target: HTMLElement): void {
    return this.#element.nativeElement.close(target);
  }

  public dateSelectedOutput = outputFromObservable(
    fromEvent<CustomEvent<T>>(this.#element.nativeElement, 'dateselected'),
    { alias: 'dateSelected' },
  );

  public beforeCloseOutput = outputFromObservable(
    fromEvent<CustomEvent<{ closeTarget: HTMLElement | null }>>(
      this.#element.nativeElement,
      'beforeclose',
    ),
    { alias: 'beforeClose' },
  );

  protected _closeOutput = outputFromObservable<CustomEvent<{ closeTarget: HTMLElement | null }>>(
    NEVER,
    { alias: 'close' },
  );
  public closeOutput = internalOutputFromObservable(
    fromEvent<CustomEvent<{ closeTarget: HTMLElement | null }>>(
      this.#element.nativeElement,
      'close',
    ),
  );

  public beforeOpenOutput = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'beforeopen'),
    { alias: 'beforeOpen' },
  );

  protected _openOutput = outputFromObservable<Event>(NEVER, { alias: 'open' });
  public openOutput = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'open'),
  );

  public escapeStrategy(): void {
    return this.#element.nativeElement.escapeStrategy();
  }
}
