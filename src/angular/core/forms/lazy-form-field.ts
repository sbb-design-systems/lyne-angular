import { inject, type Injector, runInInjectionContext } from '@angular/core';
import type { FormField } from '@angular/forms/signals';
import { FORM_FIELD } from '@angular/forms/signals';

/**
 * Due to a limitation with the dependency injection, we need to load the FormField
 * lazily. If the FormField is injected directly, it will cause a circular dependency
 * between ControlValueAccessor and FormField.
 */
export function lazyFormField(injector: Injector): FormField<unknown> | null {
  return runInInjectionContext(injector, () => inject(FORM_FIELD, { optional: true }));
}
