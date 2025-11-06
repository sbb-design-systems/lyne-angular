import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/train/train-blocked-passage.js';

/**
 * It visually displays a blocked passage between train wagons.
 */
@Directive({
  selector: 'sbb-train-blocked-passage',
  exportAs: 'sbbTrainBlockedPassage',
})
export class SbbTrainBlockedPassage {}
