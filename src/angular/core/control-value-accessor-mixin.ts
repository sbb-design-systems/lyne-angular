/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function */
import { ControlValueAccessor } from '@angular/forms';
import { AbstractConstructor } from '@sbb-esta/lyne-elements/core/mixins.js';

export interface SbbControlValueAccessorMixinType extends ControlValueAccessor {
  onChangeFn: (value: any) => void;
  onTouchedFn: () => void;
  registerOnChange(fn: any): void;
  registerOnTouched(fn: any): void;
  writeValue(value: any): void;
  setDisabledState?(isDisabled: boolean): void;
}

export const SbbControlValueAccessorMixin = <T extends AbstractConstructor>(
  superclass: T,
): AbstractConstructor<SbbControlValueAccessorMixinType> & T => {
  abstract class SbbControlValueAccessor
    extends superclass
    implements SbbControlValueAccessorMixinType
  {
    onChangeFn: (value: any) => void = () => {};
    onTouchedFn: () => void = () => {};

    registerOnChange(fn: any): void {
      this.onChangeFn = fn;
    }

    registerOnTouched(fn: any): void {
      this.onTouchedFn = fn;
    }

    abstract writeValue(value: any): void;
    abstract setDisabledState?(isDisabled: boolean): void;
  }
  return SbbControlValueAccessor;
};
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function */
