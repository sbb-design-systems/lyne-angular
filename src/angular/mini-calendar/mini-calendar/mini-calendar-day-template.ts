import { Directive, forwardRef, InjectionToken, type WritableSignal } from '@angular/core';

import type { SbbMiniCalendarDayConfig } from './mini-calendar-data-source';

export const SBB_MINI_CALENDAR_DAY_TEMPLATE = new InjectionToken<SbbMiniCalendarDayTemplate>(
  'SbbMiniCalendarDayTemplate',
);

export interface SbbMiniCalendarDayTemplateContext {
  $implicit: WritableSignal<SbbMiniCalendarDayConfig>;
}

@Directive({
  selector: '[sbbMiniCalendarDay]',
  providers: [
    {
      provide: SBB_MINI_CALENDAR_DAY_TEMPLATE,
      useExisting: forwardRef(() => SbbMiniCalendarDayTemplate),
    },
  ],
})
export class SbbMiniCalendarDayTemplate {
  static ngTemplateContextGuard(
    _dir: SbbMiniCalendarDayTemplate,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _ctx: any,
  ): _ctx is SbbMiniCalendarDayTemplateContext {
    // The guard body is not used at runtime, and included only to avoid
    // TypeScript errors.
    return true;
  }
}
