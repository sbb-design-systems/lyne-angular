import type { Provider } from '@angular/core';
import { DateAdapter, TemporalDateAdapter } from '@sbb-esta/lyne-elements/core/datetime.js';

/**
 * Provides the Temporal date adapter for Angular's dependency injection.
 * IMPORTANT: This is not currently used for resolving the date adapter in components
 * that use a date adapter. We are currently investigating on how we can achieve this
 * without breaking expectations.
 */
export function provideTemporalDateAdapter(): Provider[] {
  return [
    {
      provide: DateAdapter,
      useClass: TemporalDateAdapter,
    },
  ];
}
