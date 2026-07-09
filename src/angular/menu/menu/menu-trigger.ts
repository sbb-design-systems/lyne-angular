import { Directive, Input } from '@angular/core';
import { SbbTriggerBase } from '@sbb-esta/lyne-angular/core';

import type { SbbMenu } from './menu';

@Directive({
  selector: `[sbbMenuTrigger]`,
  exportAs: 'sbbMenuTrigger',
})
export class SbbMenuTrigger extends SbbTriggerBase<SbbMenu> {
  /** The menu to be attached to this trigger. */
  @Input('sbbMenuTrigger')
  get menu(): SbbMenu | null {
    return this.referenceElement;
  }
  set menu(menu: SbbMenu) {
    this.referenceElement = menu;
  }
}
