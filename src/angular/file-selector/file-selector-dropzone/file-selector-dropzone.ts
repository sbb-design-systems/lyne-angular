import { Directive, ElementRef, forwardRef, inject, Input, NgZone, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { booleanAttribute, SbbControlValueAccessorMixin } from '@sbb-esta/lyne-angular/core';
import type { SbbFileSelectorDropzoneElement } from '@sbb-esta/lyne-elements/file-selector/file-selector-dropzone.js';
import { fromEvent, type Observable, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/file-selector/file-selector-dropzone.js';

@Directive({
  selector: 'sbb-file-selector-dropzone',
  exportAs: 'sbbFileSelectorDropzone',
  host: {
    '(change)': 'this.onChangeFn(this.files)',
    '(blur)': 'this.onTouchedFn()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SbbFileSelectorDropzone),
      multi: true,
    },
  ],
})
export class SbbFileSelectorDropzone extends SbbControlValueAccessorMixin(class {}) {
  #element: ElementRef<SbbFileSelectorDropzoneElement> = inject(
    ElementRef<SbbFileSelectorDropzoneElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input({ alias: 'title-content' })
  public set titleContent(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.titleContent = value));
  }
  public get titleContent(): string {
    return this.#element.nativeElement.titleContent;
  }

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

  @Output('fileChanged') protected _fileChanged: (typeof this)['fileChanged'] = NEVER;
  public fileChanged: Observable<readonly File[]> = fromEvent<readonly File[]>(
    this.#element.nativeElement,
    'fileChanged',
  );

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output('change') protected _change: (typeof this)['change'] = NEVER;
  public change: Observable<Event> = fromEvent<Event>(this.#element.nativeElement, 'change');

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output('input') protected _input: (typeof this)['input'] = NEVER;
  public input: Observable<Event> = fromEvent<Event>(this.#element.nativeElement, 'input');

  public get type(): string {
    return this.#element.nativeElement.type;
  }

  public get form(): HTMLFormElement | null {
    return this.#element.nativeElement.form;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override writeValue(value: any): void {
    this.files = value;
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
