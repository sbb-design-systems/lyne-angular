/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function */
import { ControlValueAccessor } from '@angular/forms';

export abstract class SbbControlValueAccessor implements ControlValueAccessor {
  _controlValueAccessorChangeFn: (value: any) => void = () => {};
  _controlValueAccessorTouchedFn: () => void = () => {};
  abstract writeValue(value: any): void;

  registerOnChange(fn: any): void {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this._controlValueAccessorTouchedFn = fn;
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function */
