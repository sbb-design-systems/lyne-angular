import { FocusMonitor } from '@angular/cdk/a11y';
import {
  type AfterViewInit,
  Directive,
  ElementRef,
  forwardRef,
  inject,
  Input,
  NgZone,
} from '@angular/core';
import { outputFromObservable, toSignal } from '@angular/core/rxjs-interop';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { booleanAttribute, SbbControlValueAccessorMixin } from '@sbb-esta/lyne-angular/core';
import type { SbbCheckboxGroupElement } from '@sbb-esta/lyne-elements/checkbox/checkbox-group.js';
import type { SbbCheckboxPanelElement } from '@sbb-esta/lyne-elements/checkbox/checkbox-panel.js';
import type { SbbPanelSize } from '@sbb-esta/lyne-elements/core/mixins.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/checkbox/checkbox-panel.js';

@Directive({
  selector: 'sbb-checkbox-panel',
  exportAs: 'sbbCheckboxPanel',
  host: {
    '(change)': 'this.onChangeFn(this.checked)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SbbCheckboxPanel),
      multi: true,
    },
  ],
})
export class SbbCheckboxPanel<T = string>
  extends SbbControlValueAccessorMixin(class {})
  implements AfterViewInit
{
  #element: ElementRef<SbbCheckboxPanelElement<T>> = inject(ElementRef<SbbCheckboxPanelElement<T>>);
  #ngZone: NgZone = inject(NgZone);
  #focusMonitor = inject(FocusMonitor);

  @Input()
  public set size(value: SbbPanelSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbPanelSize {
    return this.#element.nativeElement.size;
  }

  @Input()
  public set color(value: 'white' | 'milk') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'white' | 'milk' {
    return this.#element.nativeElement.color;
  }

  @Input({ transform: booleanAttribute })
  public set borderless(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.borderless = value));
  }
  public get borderless(): boolean {
    return this.#element.nativeElement.borderless;
  }

  @Input({ transform: booleanAttribute })
  public set indeterminate(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.indeterminate = value));
  }
  public get indeterminate(): boolean {
    return this.#element.nativeElement.indeterminate;
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
  public set value(value: T | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): T | null {
    return this.#element.nativeElement.value;
  }

  public get group(): SbbCheckboxGroupElement | null {
    return this.#element.nativeElement.group;
  }

  public get type(): string {
    return this.#element.nativeElement.type;
  }

  public get form(): HTMLFormElement | null {
    return this.#element.nativeElement.form;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override writeValue(value: any): void {
    this.checked = !!value;
  }

  ngAfterViewInit() {
    this.#focusMonitor.monitor(this.#element, true).subscribe((focusOrigin) => {
      if (!focusOrigin) {
        // When a focused element becomes disabled, the browser *immediately* fires a blur event.
        // Angular does not expect events to be raised during change detection, so any state change
        // (such as a form control's 'ng-touched') will cause a changed-after-checked error.
        // See https://github.com/angular/angular/issues/17793. To work around this, we defer
        // telling the form control it has been touched until the next tick.
        Promise.resolve().then(() => {
          this.onTouchedFn();
        });
      }
    });
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

  protected _changeSignal = outputFromObservable<Event>(NEVER, { alias: 'change' });
  public changeSignal = toSignal(fromEvent<Event>(this.#element.nativeElement, 'change'));

  protected _inputSignal = outputFromObservable<InputEvent>(NEVER, { alias: 'input' });
  public inputSignal = toSignal(fromEvent<InputEvent>(this.#element.nativeElement, 'input'));
}
