import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import type { SbbCheckboxPanel } from '@sbb-esta/lyne-angular/checkbox-panel';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbRadioButtonPanelModule } from '@sbb-esta/lyne-angular/radio-button-panel';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic radio-button-panel
 */
@Component({
  selector: 'sbb-radio-button-panel-showcase-example',
  templateUrl: 'radio-button-panel-showcase-example.html',
  styleUrl: 'radio-button-panel-showcase-example.scss',
  imports: [
    FormField,
    SbbRadioButtonPanelModule,
    SbbCardModule,
    SbbCheckboxModule,
    SbbIconModule,
    SbbTitleModule,
    SbbRadioButtonModule,
  ],
})
export class RadioButtonPanelShowcaseExample {
  protected controls = form(
    signal({
      size: null,
      color: 'white' as SbbCheckboxPanel['color'],
      checked: true,
      disabled: false,
      borderless: false,
      allowEmptySelection: false,
    }),
  );
}
