import { Component } from '@angular/core';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbTrainModule } from '@sbb-esta/lyne-angular/train';

/**
 * @title Basic train
 */
@Component({
  selector: 'sbb-train-basic-example',
  templateUrl: 'train-basic-example.html',
  imports: [SbbTrainModule, SbbIconModule],
})
export class TrainBasicExample {}
