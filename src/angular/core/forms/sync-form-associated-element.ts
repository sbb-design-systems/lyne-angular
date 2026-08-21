import { type ElementRef, inject, type Injector, runInInjectionContext } from '@angular/core';
import { type FieldState, FORM_FIELD, type FormField } from '@angular/forms/signals';

/**
 * Synchronizes the state of a FormField with the underlying form-associated element.
 * This function is intended to be used in a reactive effect and syncs
 * the `required`, `disabled` and `readonly` attributes and the error state.
 * @internal
 */
export function syncFormAssociatedElement(
  elementRef: ElementRef<HTMLElement & Pick<HTMLInputElement, 'setCustomValidity'>>,
  injector: Injector,
  action?: (state: FieldState<unknown>) => void,
): () => void {
  let formField: FormField<unknown> | null = null;
  return () => {
    // Due to a limitation with the dependency injection, we need to load the FormField
    // lazily. If the FormField is injected directly in the component, it will cause a
    // circular dependency between ControlValueAccessor and FormField.
    formField ??= runInInjectionContext(injector, () => inject(FORM_FIELD, { optional: true }));
    if (!formField) {
      return;
    }

    const state = formField.state();
    if (!state) {
      return;
    }

    const element = elementRef.nativeElement;
    element.toggleAttribute('required', state.required?.() ?? false);
    element.toggleAttribute('disabled', state.disabled?.() ?? false);
    element.toggleAttribute('readonly', state.readonly?.() ?? false);

    action?.(state);

    const errors = state.errors?.() ?? [];
    element.setCustomValidity(errors.map((e) => e.message || e.kind).join('\n'));
  };
}
