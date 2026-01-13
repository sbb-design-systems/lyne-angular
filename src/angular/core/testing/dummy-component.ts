import { Component, inject, Injector } from '@angular/core';
import { SBB_OVERLAY_DATA, SbbOverlayRef } from '@sbb-esta/lyne-angular/core/overlay';

@Component({
  selector: 'sbb-dummy-component',
  template: `This is a dummy component meant for testing. Dummy string: {{ data?.dummyText }}`,
})
export class SbbDummyComponent {
  readonly data = inject<SampleData>(SBB_OVERLAY_DATA, { optional: true });
  readonly ref = inject(SbbOverlayRef);
  readonly injector = inject(Injector);
}

export interface SampleData {
  dummyText: string;
}
