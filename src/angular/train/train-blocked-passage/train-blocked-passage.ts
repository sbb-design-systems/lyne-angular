import { Directive } from '@angular/core';
import { SbbTrainBlockedPassageElement } from '@sbb-esta/lyne-elements/train.pure.js';

/**
 * It visually displays a blocked passage between train wagons.
 */
@Directive({
  selector: 'sbb-train-blocked-passage',
  exportAs: 'sbbTrainBlockedPassage',
})
export class SbbTrainBlockedPassage {
  static {
    SbbTrainBlockedPassageElement.define();
  }
}
