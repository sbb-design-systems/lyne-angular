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
import type { SbbStepLabelElement } from '@sbb-esta/lyne-elements/stepper/step-label.js';
import { SbbStepElement } from '@sbb-esta/lyne-elements/stepper/step.js';
import '@sbb-esta/lyne-elements/stepper/step-label.js';

const SBB_STEP_LABEL_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SbbStepLabelDirective),
  multi: true,
};

@Directive({
  selector: 'sbb-step-label',
  standalone: true,
  providers: [SBB_STEP_LABEL_CONTROL_VALUE_ACCESSOR],
})
export class SbbStepLabelDirective extends SbbControlValueAccessor {
  #element: ElementRef<SbbStepLabelElement> = inject(ElementRef<SbbStepLabelElement>);
  #ngZone: NgZone = inject(NgZone);

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'icon-name' })
  public set iconName(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.iconName = value));
  }
  public get iconName(): string {
    return this.#element.nativeElement.iconName;
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

  public get step(): SbbStepElement | null {
    return this.#element.nativeElement.step;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string | null): void {
    this.value = value;
  }
}
