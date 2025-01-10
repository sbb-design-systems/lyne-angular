/* eslint-disable @angular-eslint/directive-selector */
import {
  Directive,
  ElementRef,
  Input,
  NgZone,
  Output,
  inject,
  forwardRef,
  ExistingProvider,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { booleanAttribute, SbbControlValueAccessor } from '@sbb-esta/lyne-angular/core';
import type { SbbToggleCheckElement } from '@sbb-esta/lyne-elements/toggle-check.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/toggle-check.js';

const SBB_TOGGLE_CHECK_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SbbToggleCheckDirective),
  multi: true,
};

@Directive({
  selector: 'sbb-toggle-check',
  standalone: true,
  providers: [SBB_TOGGLE_CHECK_CONTROL_VALUE_ACCESSOR],
})
export class SbbToggleCheckDirective extends SbbControlValueAccessor {
  #element: ElementRef<SbbToggleCheckElement> = inject(ElementRef<SbbToggleCheckElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set size(value: 'xs' | 's' | 'm') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'xs' | 's' | 'm' {
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
  @Input({ alias: 'label-position' })
  public set labelPosition(value: 'before' | 'after') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.labelPosition = value));
  }
  public get labelPosition(): 'before' | 'after' {
    return this.#element.nativeElement.labelPosition;
  }

  @Input({ transform: booleanAttribute })
  public set checked(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.checked = value));
  }
  public get checked(): boolean {
    return this.#element.nativeElement.checked;
  }

  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }

  @Input({ transform: booleanAttribute })
  public set required(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.required = value));
  }
  public get required(): boolean {
    return this.#element.nativeElement.required;
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

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() public change: Observable<Event> = fromEvent<Event>(
    this.#element.nativeElement,
    'change',
  );

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() public input: Observable<InputEvent> = fromEvent<InputEvent>(
    this.#element.nativeElement,
    'input',
  );

  public get type(): string {
    return this.#element.nativeElement.type;
  }

  public get form(): HTMLFormElement | null {
    return this.#element.nativeElement.form;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string | null): void {
    this.value = value;
  }
}
