This documentation focuses on the Angular features of the `sbb-form-field`.
For Lyne elements documentation and API, check the Lyne Elements Storybook on [https://lyne-storybook.app.sbb.ch/?path=/docs/elements-sbb-form-field-sbb-form-field--docs](https://lyne-storybook.app.sbb.ch/?path=/docs/elements-sbb-form-field-sbb-form-field--docs).

## Custom Form Controls

In order for `<sbb-form-field>` to support a custom form component, you need to implement
the `SbbFormFieldControl` interface and register it as a provider.
Important to note is that the `stateChanges` observable MUST emit whenever
one of the properties defined in `SbbFormFieldControl` changes.

```ts
@Component({
  selector: 'sbb-custom-control',
  template: `<input (input)="onInput()" (blur)="onTouched()" #input />`,
  host: {
    '[id]': 'id',
  },
  providers: [
    { provide: SbbFormFieldControl, useExisting: forwardRef(() => CustomControlComponent) },
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CustomControlComponent),
    },
  ],
})
class CustomControlComponent implements SbbFormFieldControl, ControlValueAccessor, OnChanges {
  input = viewChild<ElementRef<HTMLInputElement>>('input');
  stateChanges = new Subject<void>();
  @Input() id: string = 'custom-control';
  empty: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readOnly: boolean = false;

  onChange: (value: any) => void = () => undefined;
  onTouched: () => void = () => undefined;

  onContainerClick(_event: MouseEvent): void {
    this.input()?.nativeElement.focus();
  }

  onInput() {
    const value = this.input()?.value ?? '';
    this.onChange(value);
    const empty = value.length === 0;
    if (this.empty !== empty) {
      this.empty = empty;
      this.stateChanges.next();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.stateChanges.next();
  }

  writeValue(value: any): void {
    const input = this.input();
    if (input) {
      input.nativeElement.value = value;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    const input = this.input();
    if (input) {
      input.nativeElement.disabled = isDisabled;
    }
  }
}
```
