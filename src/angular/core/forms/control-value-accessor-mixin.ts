/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function */
import { effect, inject, Injector, runInInjectionContext } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { type FieldState, FORM_FIELD, type FormField } from '@angular/forms/signals';
import type { AbstractConstructor } from '@sbb-esta/lyne-elements/core.js';

export declare class SbbControlValueAccessorMixinType implements ControlValueAccessor {
  protected get formField(): FormField<unknown> | null;
  writeValue(obj: any): void;
  registerOnChange(fn: any): void;
  registerOnTouched(fn: any): void;
  setDisabledState(isDisabled: boolean): void;
  protected onChangeFn: (value: any) => void;
  protected onTouchedFn: () => void;
  protected updateFormFieldElement?(state: FieldState<unknown>): void;
}

export const SbbControlValueAccessorMixin = <T extends AbstractConstructor>(
  superclass: T,
): AbstractConstructor<SbbControlValueAccessorMixinType> & T => {
  abstract class SbbControlValueAccessor
    extends superclass
    implements Partial<SbbControlValueAccessorMixinType>
  {
    #formField?: FormField<unknown> | null;
    readonly #injector = inject(Injector);

    abstract value: unknown;
    abstract disabled: boolean;

    protected onChangeFn: (value: any) => void = () => {};
    protected onTouchedFn: () => void = () => {};

    protected get formField(): FormField<unknown> | null {
      return this.#formField ?? null;
    }

    constructor(...args: any[]) {
      super(...args);
      // TODO(breaking-change): ControlValueAccessor and FormField integration
      // could be split into separate @Directive classes (see e.g.
      // https://github.com/angular/angular/blob/main/packages/forms/src/directives/default_value_accessor.ts#L88).
      effect(() => {
        // Due to a limitation with the dependency injection, we need to load the FormField
        // lazily. If the FormField is injected directly in the component, it will cause a
        // circular dependency between ControlValueAccessor and FormField.
        this.#formField ??= runInInjectionContext(this.#injector, () =>
          inject(FORM_FIELD, { optional: true }),
        );
        if (!this.#formField) {
          return;
        }

        const state = this.#formField.state();
        if (!state) {
          return;
        }

        const element = this.#formField.element as HTMLElement &
          Partial<Pick<HTMLInputElement, 'setCustomValidity'>>;
        // Disabled is handled via ControlValueAccessor.setDisabledState
        element.toggleAttribute('required', state.required?.() ?? false);
        element.toggleAttribute('readonly', state.readonly?.() ?? false);

        this.updateFormFieldElement?.(state);

        const errors = state.errors?.() ?? [];
        element.setCustomValidity?.(errors.map((e) => e.message || e.kind).join('\n'));
      });
    }

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

    protected updateFormFieldElement?(state: FieldState<unknown>): void;
  }
  return SbbControlValueAccessor as unknown as AbstractConstructor<SbbControlValueAccessorMixinType> &
    T;
};
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function */
