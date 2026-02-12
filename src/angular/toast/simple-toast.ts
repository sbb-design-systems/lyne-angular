import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { SBB_OVERLAY_DATA } from '@sbb-esta/lyne-angular/core/overlay';

/**
 * A component used to open as the default toast, matching digital.sbb.ch spec.
 * This should only be used internally by the notification toast service.
 */
@Component({
  selector: 'sbb-simple-toast',
  template: '<span>{{ data.message }}</span>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SbbSimpleToast {
  /** Data that was injected into the notification toast. */
  data: { message: string } = inject(SBB_OVERLAY_DATA) as { message: string };
}
