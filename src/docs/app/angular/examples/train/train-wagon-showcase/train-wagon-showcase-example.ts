import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import { type SbbTrainWagon, SbbTrainModule } from '@sbb-esta/lyne-angular/train';

/**
 * @title `sbb-train-wagon` showcase
 * @order 2
 */
@Component({
  selector: 'sbb-train-wagon-showcase-example',
  templateUrl: 'train-wagon-showcase-example.html',
  imports: [
    FormField,
    SbbFormFieldModule,
    SbbRadioButtonModule,
    SbbSelectModule,
    SbbTitleModule,
    SbbTrainModule,
  ],
})
export class TrainWagonShowcaseExample {
  protected controls = form(
    signal({
      wagonType: 'wagon' as SbbTrainWagon['wagonType'],
      occupancy: 'none' as SbbTrainWagon['occupancy'],
      wagonClass: '1' as NonNullable<SbbTrainWagon['wagonClass']>,
      label: 'label',
    }),
  );
}
