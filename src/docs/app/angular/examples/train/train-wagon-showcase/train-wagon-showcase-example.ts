import { Component, signal } from '@angular/core';
import { disabled, form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import {
  type SbbTrainWagon,
  SbbTrainModule,
  type SbbTrainFormation,
} from '@sbb-esta/lyne-angular/train';

/**
 * @title `sbb-train-wagon` showcase
 * @order 2
 */
@Component({
  selector: 'sbb-train-wagon-showcase-example',
  templateUrl: 'train-wagon-showcase-example.html',
  imports: [
    FormField,
    SbbCheckboxModule,
    SbbFormFieldModule,
    SbbIconModule,
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
      wagonClass: '1' as SbbTrainWagon['wagonClass'],
      withIcons: false,
      label: 'label',
      view: 'side' as SbbTrainFormation['view'],
      orientation: 'horizontal' as SbbTrainFormation['orientation'],
    }),
    (schemaPath) => {
      disabled(schemaPath.occupancy, {
        when: ({ valueOf }) =>
          ['couchette', 'sleeping', 'restaurant'].includes(valueOf(schemaPath.wagonType)),
      });
      disabled(schemaPath.wagonClass, {
        when: ({ valueOf }) =>
          ['couchette', 'sleeping', 'restaurant'].includes(valueOf(schemaPath.wagonType)),
      });
    },
  );
}
