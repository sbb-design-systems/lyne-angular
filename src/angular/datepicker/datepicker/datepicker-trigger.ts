import { Directive, Input } from '@angular/core';
import { SbbTriggerBase } from '@sbb-esta/lyne-angular/core';

import type { SbbDatepicker } from './datepicker';

@Directive({
  selector: `[sbbDatepicker]`,
  exportAs: 'sbbDatepickerTrigger',
})
export class SbbDatepickerTrigger extends SbbTriggerBase<SbbDatepicker> {
  /** The datepicker to be attached to this trigger. */
  @Input('sbbDatepicker')
  get datepicker(): SbbDatepicker | null {
    return this.referenceElement;
  }
  set datepicker(datepicker: SbbDatepicker) {
    this.referenceElement = datepicker;
  }
}
