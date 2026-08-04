import { Directive, Input } from '@angular/core';
import { SbbTriggerBase } from '@sbb-esta/lyne-angular/core';

import type { SbbEasterEgg } from './easter-egg';

@Directive({
  selector: `[sbbEasterEgg]`,
  exportAs: 'sbbEasterEggTrigger',
})
export class SbbEasterEggTrigger extends SbbTriggerBase<SbbEasterEgg> {
  /** The dialog to be attached to this trigger. */
  @Input('sbbEasterEgg')
  get dialog(): SbbEasterEgg | null {
    return this.referenceElement;
  }
  set dialog(dialog: SbbEasterEgg) {
    this.referenceElement = dialog;
  }
}
