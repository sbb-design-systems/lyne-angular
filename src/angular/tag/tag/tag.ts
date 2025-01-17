/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, forwardRef, inject, Input, NgZone, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { booleanAttribute, SbbControlValueAccessorMixin } from '@sbb-esta/lyne-angular/core';
import { SbbButtonType } from '@sbb-esta/lyne-elements/core/base-elements.js';
import type { SbbTagElement, SbbTagSize } from '@sbb-esta/lyne-elements/tag/tag.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/tag/tag.js';

@Directive({
  selector: 'sbb-tag',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SbbTagDirective),
      multi: true,
    },
  ],
})
export class SbbTagDirective extends SbbControlValueAccessorMixin(class {}) {
  #element: ElementRef<SbbTagElement> = inject(ElementRef<SbbTagElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set amount(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.amount = value));
  }
  public get amount(): string {
    return this.#element.nativeElement.amount;
  }

  @Input({ transform: booleanAttribute })
  public set checked(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.checked = value));
  }
  public get checked(): boolean {
    return this.#element.nativeElement.checked;
  }

  @Input()
  public set size(value: SbbTagSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbTagSize {
    return this.#element.nativeElement.size;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'icon-name' })
  public set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public get iconName(): string {
    return this.#element.nativeElement.iconName;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'disabled-interactive', transform: booleanAttribute })
  public set disabledInteractive(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabledInteractive = value));
  }
  public get disabledInteractive(): boolean {
    return this.#element.nativeElement.disabledInteractive;
  }

  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
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

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() public input: Observable<void> = fromEvent<void>(this.#element.nativeElement, 'input');

  @Output() public didChange: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'didChange',
  );

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() public change: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'change',
  );

  override setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  override writeValue(value: string | null): void {
    this.value = value;
  }
}
