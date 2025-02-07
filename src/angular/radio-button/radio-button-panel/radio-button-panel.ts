import { FocusMonitor } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  forwardRef,
  inject,
  Input,
  NgZone,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { booleanAttribute, SbbControlValueAccessorMixin } from '@sbb-esta/lyne-angular/core';
import { SbbPanelSize } from '@sbb-esta/lyne-elements/core/mixins.js';
import { SbbRadioButtonGroupElement } from '@sbb-esta/lyne-elements/radio-button/radio-button-group.js';
import type { SbbRadioButtonPanelElement } from '@sbb-esta/lyne-elements/radio-button/radio-button-panel.js';
import { fromEvent, type Observable } from 'rxjs';

import '@sbb-esta/lyne-elements/radio-button/radio-button-panel.js';

@Directive({
  selector: 'sbb-radio-button-panel',
  exportAs: 'sbbRadioButtonPanel',
  host: {
    '(change)': 'this.onChangeFn(this.checked)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SbbRadioButtonPanel),
      multi: true,
    },
  ],
})
export class SbbRadioButtonPanel
  extends SbbControlValueAccessorMixin(class {})
  implements AfterViewInit
{
  #element: ElementRef<SbbRadioButtonPanelElement> = inject(ElementRef<SbbRadioButtonPanelElement>);
  #ngZone: NgZone = inject(NgZone);
  #focusMonitor: FocusMonitor = inject(FocusMonitor);

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
}
