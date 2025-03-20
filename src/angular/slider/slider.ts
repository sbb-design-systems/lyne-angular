import { Directive, ElementRef, forwardRef, inject, Input, NgZone, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { booleanAttribute, SbbControlValueAccessorMixin } from '@sbb-esta/lyne-angular/core';
import type { SbbSliderElement } from '@sbb-esta/lyne-elements/slider.js';
import { fromEvent, type Observable, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/slider.js';

@Directive({
  selector: 'sbb-slider',
  exportAs: 'sbbSlider',
  host: {
    '(change)': 'this.onChangeFn(this.checked)',
    '(blur)': 'this.onTouchedFn()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SbbSlider),
      multi: true,
    },
  ],
})
export class SbbSlider extends SbbControlValueAccessorMixin(class {}) {
  #element: ElementRef<SbbSliderElement> = inject(ElementRef<SbbSliderElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set value(value: string | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): string | null {
    return this.#element.nativeElement.value;
  }

  @Input({ alias: 'value-as-number' })
  public set valueAsNumber(value: number | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.valueAsNumber = value));
  }
  public get valueAsNumber(): number | null {
    return this.#element.nativeElement.valueAsNumber;
  }

  @Input()
  public set min(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.min = value));
  }
  public get min(): string {
    return this.#element.nativeElement.min;
  }

  @Input()
  public set max(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.max = value));
  }
  public get max(): string {
    return this.#element.nativeElement.max;
  }

  @Input({ transform: booleanAttribute })
  public set readonly(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.readonly = value));
  }
  public get readonly(): boolean {
    return this.#element.nativeElement.readonly;
  }

  @Input({ alias: 'start-icon' })
  public set startIcon(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.startIcon = value));
  }
  public get startIcon(): string {
    return this.#element.nativeElement.startIcon;
  }

  @Input({ alias: 'end-icon' })
  public set endIcon(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.endIcon = value));
  }
  public get endIcon(): string {
    return this.#element.nativeElement.endIcon;
  }

  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }

  @Input()
  public set name(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.name = value));
  }
  public get name(): string {
    return this.#element.nativeElement.name;
  }

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('didChange') protected _didChange: (typeof this)['didChange'] = NEVER;
  public didChange: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'didChange');

  public get type(): string {
    return this.#element.nativeElement.type;
  }

  public get form(): HTMLFormElement | null {
    return this.#element.nativeElement.form;
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
