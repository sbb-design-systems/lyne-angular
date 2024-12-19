/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, Input, NgZone, Output, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbSliderElement } from '@sbb-esta/lyne-elements/slider.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/slider.js';

@Directive({
  selector: 'sbb-slider',
  standalone: true,
})
export class SbbSliderDirective {
  #element: ElementRef<SbbSliderElement> = inject(ElementRef<SbbSliderElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set value(value: string | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): string | null {
    return this.#element.nativeElement.value;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
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

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'start-icon' })
  public set startIcon(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.startIcon = value));
  }
  public get startIcon(): string {
    return this.#element.nativeElement.startIcon;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
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

  @Output() public didChange: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'didChange',
  );

  public get type(): string {
    return this.#element.nativeElement.type;
  }

  public get form(): HTMLFormElement | null {
    return this.#element.nativeElement.form;
  }
}
