/* eslint-disable @angular-eslint/directive-selector, @angular-eslint/directive-class-suffix */
import { Directive } from '@angular/core';
import '@sbb-esta/lyne-elements/train/train-blocked-passage.js';

@Directive({
  selector: 'sbb-train-blocked-passage',
  standalone: true,
})
export class SbbTrainBlockedPassage {}
