/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, inject, Input, NgZone, Output } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbRadioButtonGroupElement } from '@sbb-esta/lyne-elements/radio-button/radio-button-group.js';
import type { SbbRadioButtonElement } from '@sbb-esta/lyne-elements/radio-button/radio-button.js';
import { SbbRadioButtonSize } from '@sbb-esta/lyne-elements/radio-button.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/radio-button/radio-button.js';

@Directive({
  selector: 'sbb-radio-button',
  standalone: true,
})
export class SbbRadioButtonDirective {
  #element: ElementRef<SbbRadioButtonElement> = inject(ElementRef<SbbRadioButtonElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set size(value: SbbRadioButtonSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbRadioButtonSize {
    return this.#element.nativeElement.size;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'allow-empty-selection', transform: booleanAttribute })
  public set allowEmptySelection(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.allowEmptySelection = value));
  }
  public get allowEmptySelection(): boolean {
    return this.#element.nativeElement.allowEmptySelection;
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

  public get group(): SbbRadioButtonGroupElement | null {
    return this.#element.nativeElement.group;
  }

  public get type(): string {
    return this.#element.nativeElement.type;
  }

  public get form(): HTMLFormElement | null {
    return this.#element.nativeElement.form;
  }

  public select(): void {
    return this.#element.nativeElement.select();
  }
}
