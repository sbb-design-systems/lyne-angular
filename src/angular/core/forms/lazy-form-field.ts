import { inject, type Injector, runInInjectionContext } from '@angular/core';
import type { FormField } from '@angular/forms/signals';
import { FORM_FIELD } from '@angular/forms/signals';

export function lazyFormField(injector: Injector): FormField<unknown> | null {
  return runInInjectionContext(injector, () => inject(FORM_FIELD, { optional: true }));
}
