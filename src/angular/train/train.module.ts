import { NgModule } from '@angular/core';

import { SbbTrain } from './train/train';
import { SbbTrainBlockedPassage } from './train-blocked-passage/train-blocked-passage';
import { SbbTrainFormation } from './train-formation/train-formation';
import { SbbTrainWagon } from './train-wagon/train-wagon';

const SBB_TRAIN_EXPORTED_DECLARATIONS = [
  SbbTrain,
  SbbTrainBlockedPassage,
  SbbTrainFormation,
  SbbTrainWagon,
];

@NgModule({
  imports: SBB_TRAIN_EXPORTED_DECLARATIONS,
  exports: SBB_TRAIN_EXPORTED_DECLARATIONS,
})
export class SbbTrainModule {}
