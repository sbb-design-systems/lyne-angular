import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import { type SbbTrainFormation, SbbTrainModule } from '@sbb-esta/lyne-angular/train';

/**
 * @title `sbb-train-formation` showcase
 * @order 1
 */
@Component({
  selector: 'sbb-train-showcase-example',
  templateUrl: 'train-showcase-example.html',
  imports: [FormField, RouterLink, SbbTrainModule, SbbIconModule, SbbTitle, SbbRadioButtonModule],
})
export class TrainShowcaseExample {
  protected controls = form(
    signal({
      view: 'side' as SbbTrainFormation['view'],
    }),
  );
}
