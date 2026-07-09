import { Directive, Input } from '@angular/core';
import { SbbTriggerBase } from '@sbb-esta/lyne-angular/core';

import type { SbbTooltip } from './tooltip';

@Directive({
  selector: `[sbbTooltipTrigger]`,
  exportAs: 'sbbTooltipTrigger',
})
export class SbbTooltipTrigger extends SbbTriggerBase<SbbTooltip> {
  /** The tooltip to be attached to this trigger. */
  @Input('sbbTooltipTrigger')
  get tooltip(): SbbTooltip | null {
    return this.referenceElement;
  }
  set tooltip(tooltip: SbbTooltip) {
    this.referenceElement = tooltip;
  }
}
