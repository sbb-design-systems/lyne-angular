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
import type { SbbFormFieldClearElement } from '@sbb-esta/lyne-elements/form-field/form-field-clear.js';
import '@sbb-esta/lyne-elements/form-field/form-field-clear.js';

const SBB_FORM_FIELD_CLEAR_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SbbFormFieldClearDirective),
  multi: true,
};

@Directive({
  selector: 'sbb-form-field-clear',
  standalone: true,
  providers: [SBB_FORM_FIELD_CLEAR_CONTROL_VALUE_ACCESSOR],
})
export class SbbFormFieldClearDirective extends SbbControlValueAccessor {
  #element: ElementRef<SbbFormFieldClearElement> = inject(ElementRef<SbbFormFieldClearElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
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
