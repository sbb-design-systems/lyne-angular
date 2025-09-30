import { Directive, inject, InjectionToken, TemplateRef } from '@angular/core';

export const SBB_TAB_CONTENT = new InjectionToken<SbbTabContent>('SbbTabContent');

@Directive({
  selector: '[sbbTabContent]',
  providers: [{ provide: SBB_TAB_CONTENT, useExisting: SbbTabContent }],
})
export class SbbTabContent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  template = inject<TemplateRef<any>>(TemplateRef);
}
