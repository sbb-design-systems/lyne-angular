/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function */
import { ControlValueAccessor } from '@angular/forms';
import { AbstractConstructor } from '@sbb-esta/lyne-elements/core/mixins.js';

export declare class SbbControlValueAccessorMixinType implements ControlValueAccessor {
  writeValue(obj: any): void;
  registerOnChange(fn: any): void;
  registerOnTouched(fn: any): void;
  setDisabledState(isDisabled: boolean): void;
  protected onChangeFn: (value: any) => void;
  protected onTouchedFn: () => void;
}

export const SbbControlValueAccessorMixin = <T extends AbstractConstructor>(
  superclass: T,
): AbstractConstructor<SbbControlValueAccessorMixinType> & T => {
  abstract class SbbControlValueAccessor
    extends superclass
    implements Partial<SbbControlValueAccessorMixinType>
  {
    abstract value: unknown;
    abstract disabled: boolean;

    protected onChangeFn: (value: any) => void = () => {};
    protected onTouchedFn: () => void = () => {};

    /**
     * @internal
     */
    registerOnChange(fn: any): void {
      this.onChangeFn = fn;
    }

    /**
     * @internal
     */
    registerOnTouched(fn: any): void {
      this.onTouchedFn = fn;
    }

    writeValue(value: any): void {
      this.value = value;
    }

    setDisabledState(isDisabled: boolean): void {
      this.disabled = isDisabled;
    }
  }
  return SbbControlValueAccessor as unknown as AbstractConstructor<SbbControlValueAccessorMixinType> &
    T;
};
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function */
