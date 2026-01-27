import { Directive, inject, InjectionToken, TemplateRef } from '@angular/core';

export const SBB_EXPANSION_PANEL_CONTENT = new InjectionToken<SbbExpansionPanelContentDirective>(
  'SbbExpansionPanelContentDirective',
);

@Directive({
  selector: '[sbbExpansionPanelContent]',
  providers: [
    { provide: SBB_EXPANSION_PANEL_CONTENT, useExisting: SbbExpansionPanelContentDirective },
  ],
})
export class SbbExpansionPanelContentDirective {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  template = inject<TemplateRef<any>>(TemplateRef);
}
