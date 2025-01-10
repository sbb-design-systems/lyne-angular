/* eslint-disable @angular-eslint/directive-selector */
import {
  Directive,
  ElementRef,
  Input,
  NgZone,
  inject,
  ExistingProvider,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { booleanAttribute, SbbControlValueAccessor } from '@sbb-esta/lyne-angular/core';
import { SbbButtonType } from '@sbb-esta/lyne-elements/core/base-elements.js';
import type { SbbDatepickerPreviousDayElement } from '@sbb-esta/lyne-elements/datepicker/datepicker-previous-day.js';
import '@sbb-esta/lyne-elements/datepicker/datepicker-previous-day.js';
import { SbbDatepickerElement } from '@sbb-esta/lyne-elements/datepicker/datepicker.js';

const SBB_DATEPICKER_PREVIOUS_DAY_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SbbDatepickerPreviousDayDirective),
  multi: true,
};

@Directive({
  selector: 'sbb-datepicker-previous-day',
  standalone: true,
  providers: [SBB_DATEPICKER_PREVIOUS_DAY_CONTROL_VALUE_ACCESSOR],
})
export class SbbDatepickerPreviousDayDirective<T = Date> extends SbbControlValueAccessor {
  #element: ElementRef<SbbDatepickerPreviousDayElement<T>> = inject(
    ElementRef<SbbDatepickerPreviousDayElement<T>>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'date-picker' })
  public set datePicker(value: string | SbbDatepickerElement<T> | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.datePicker = value));
  }
  public get datePicker(): string | SbbDatepickerElement<T> | null {
    return this.#element.nativeElement.datePicker;
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

  @Input()
  public set value(value: string | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): string | null {
    return this.#element.nativeElement.value;
  }

  @Input()
  public set type(value: SbbButtonType) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.type = value));
  }
  public get type(): SbbButtonType {
    return this.#element.nativeElement.type;
  }

  writeValue(value: string | null): void {
    this.value = value;
  }
}
