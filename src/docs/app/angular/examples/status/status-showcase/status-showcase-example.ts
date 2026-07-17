import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';
import { type SbbStatus, SbbStatusModule } from '@sbb-esta/lyne-angular/status';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';

/**
 * @title status with configurable properties
 */
@Component({
  selector: 'sbb-status-basic-example',
  templateUrl: 'status-showcase-example.html',
  imports: [
    FormField,
    SbbStatusModule,
    SbbTitle,
    SbbCheckboxModule,
    SbbSelectModule,
    SbbFormFieldModule,
  ],
})
export class StatusShowcaseExample {
  protected readonly controls = form(
    signal({
      type: 'info' as SbbStatus['type'],
      hasCustomIcon: false,
      withTitle: true,
    }),
  );
}
