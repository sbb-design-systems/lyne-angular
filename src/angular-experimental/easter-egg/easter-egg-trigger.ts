import { Directive, Input } from '@angular/core';
import { SbbTriggerBase } from '@sbb-esta/lyne-angular/core';

import type { SbbEasterEgg } from './easter-egg';

@Directive({
  selector: `[sbbEasterEgg]`,
  exportAs: 'sbbEasterEggTrigger',
})
export class SbbEasterEggTrigger extends SbbTriggerBase<SbbEasterEgg> {
  /** The easter-egg to be attached to this trigger. */
  @Input('sbbEasterEgg')
  get easterEgg(): SbbEasterEgg | null {
    return this.referenceElement;
  }
  set easterEgg(easterEgg: SbbEasterEgg) {
    this.referenceElement = easterEgg;
  }
}
