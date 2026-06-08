import { Component } from '@angular/core';
import { SbbTrainModule } from '@sbb-esta/lyne-angular/train';

/**
 * @title Basic train
 */
@Component({
  selector: 'sbb-train-basic-example',
  templateUrl: 'train-basic-example.html',
  imports: [SbbTrainModule],
})
export class TrainBasicExample {}
