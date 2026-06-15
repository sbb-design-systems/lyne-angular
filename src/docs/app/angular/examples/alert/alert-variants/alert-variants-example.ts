import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbAlertModule } from '@sbb-esta/lyne-angular/alert';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import type { SbbAlertElement } from '@sbb-esta/lyne-elements/alert.pure.js';

/**
 * @title sbb-alert with configurable properties
 */
@Component({
  selector: 'sbb-alert-variants-example',
  templateUrl: 'alert-variants-example.html',
  imports: [
    FormField,
    SbbCheckboxModule,
    SbbAlertModule,
    SbbFormFieldModule,
    SbbLinkModule,
    SbbRadioButtonModule,
    SbbSelectModule,
    SbbTitleModule,
  ],
})
export class AlertVariantsExample {
  protected controls = form(
    signal({
      iconName: 'info',
      readOnly: false,
      size: null as SbbAlertElement['size'],
    }),
  );
}
