import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[sbbTabContent]',
})
export class SbbTabContent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  template = inject<TemplateRef<any>>(TemplateRef);
}
