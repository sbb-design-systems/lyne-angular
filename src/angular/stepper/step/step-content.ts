import { Directive, forwardRef, inject, InjectionToken, TemplateRef } from '@angular/core';

export const SBB_STEP_CONTENT = new InjectionToken<SbbStepContent>('SbbStepContent');

@Directive({
  selector: '[sbbStepContent]',
  providers: [{ provide: SBB_STEP_CONTENT, useExisting: forwardRef(() => SbbStepContent) }],
})
export class SbbStepContent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  template = inject<TemplateRef<any>>(TemplateRef);
}
