/* eslint-disable @angular-eslint/directive-selector, @angular-eslint/directive-class-suffix */
import { Directive, ElementRef, Input, NgZone, Output, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { FormRestoreReason, FormRestoreState } from '@sbb-esta/lyne-elements/core/mixins.js';
import type { SbbFileSelectorElement } from '@sbb-esta/lyne-elements/file-selector/file-selector.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/file-selector/file-selector.js';

@Directive({
  selector: 'sbb-file-selector',
  standalone: true,
})
export class SbbFileSelector {
  #element: ElementRef<SbbFileSelectorElement> = inject(ElementRef<SbbFileSelectorElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set size(value: 's' | 'm') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 's' | 'm' {
    return this.#element.nativeElement.size;
  }

  @Input({ transform: booleanAttribute })
  public set multiple(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.multiple = value));
  }
  public get multiple(): boolean {
    return this.#element.nativeElement.multiple;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'multiple-mode' })
  public set multipleMode(value: 'default' | 'persistent') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.multipleMode = value));
  }
  public get multipleMode(): 'default' | 'persistent' {
    return this.#element.nativeElement.multipleMode;
  }

  @Input()
  public set accept(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accept = value));
  }
  public get accept(): string {
    return this.#element.nativeElement.accept;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'accessibility-label' })
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }

  @Input()
  public set value(value: string | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): string | null {
    return this.#element.nativeElement.value;
  }

  @Input()
  public set files(value: Readonly<File>[]) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.files = value));
  }
  public get files(): Readonly<File>[] {
    return this.#element.nativeElement.files;
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

  @Output() public fileChanged: Observable<readonly File[]> = fromEvent<readonly File[]>(
    this.#element.nativeElement,
    'fileChanged',
  );

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() public change: Observable<Event> = fromEvent<Event>(
    this.#element.nativeElement,
    'change',
  );

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() public input: Observable<Event> = fromEvent<Event>(
    this.#element.nativeElement,
    'input',
  );

  public get type(): string {
    return this.#element.nativeElement.type;
  }

  public get form(): HTMLFormElement | null {
    return this.#element.nativeElement.form;
  }

  public formResetCallback(): void {
    return this.#element.nativeElement.formResetCallback();
  }

  public formStateRestoreCallback(
    state: FormRestoreState | null,
    _reason: FormRestoreReason,
  ): void {
    return this.#element.nativeElement.formStateRestoreCallback(state, _reason);
  }
}
