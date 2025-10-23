import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbButtonType } from '@sbb-esta/lyne-elements/core/base-elements.js';
import type { SbbMiniCalendarDayElement } from '@sbb-esta/lyne-elements/mini-calendar/mini-calendar-day.js';

import '@sbb-esta/lyne-elements/mini-calendar/mini-calendar-day.js';

@Directive({
  selector: 'sbb-mini-calendar-day',
  exportAs: 'sbbMiniCalendarDay',
})
export class SbbMiniCalendarDay<T = Date> {
  #element: ElementRef<SbbMiniCalendarDayElement<T>> = inject(
    ElementRef<SbbMiniCalendarDayElement<T>>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set date(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.date = value));
  }
  public get date(): string {
    return this.#element.nativeElement.date;
  }

  @Input()
  public set marker(value: 'target' | 'circle' | 'slash' | 'cross' | string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.marker = value));
  }
  public get marker(): 'target' | 'circle' | 'slash' | 'cross' | string {
    return this.#element.nativeElement.marker;
  }

  @Input()
  public set color(value: 'charcoal' | 'cloud' | 'orange' | 'red' | 'sky' | string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'charcoal' | 'cloud' | 'orange' | 'red' | 'sky' | string {
    return this.#element.nativeElement.color;
  }

  @Input()
  public set value(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): string {
    return this.#element.nativeElement.value;
  }

  @Input()
  public set type(value: SbbButtonType) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.type = value));
  }
  public get type(): SbbButtonType {
    return this.#element.nativeElement.type;
  }

  @Input()
  public set form(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.form = value));
  }
  public get form(): HTMLFormElement | null {
    return this.#element.nativeElement.form;
  }

  @Input()
  public set name(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.name = value));
  }
  public get name(): string {
    return this.#element.nativeElement.name;
  }

  public get validity(): ValidityState {
    return this.#element.nativeElement.validity;
  }

  public get validationMessage(): string {
    return this.#element.nativeElement.validationMessage;
  }

  public get willValidate(): boolean {
    return this.#element.nativeElement.willValidate;
  }

  public checkValidity(): boolean {
    return this.#element.nativeElement.checkValidity();
  }

  public reportValidity(): boolean {
    return this.#element.nativeElement.reportValidity();
  }

  public setCustomValidity(message: string): void {
    return this.#element.nativeElement.setCustomValidity(message);
  }
}
