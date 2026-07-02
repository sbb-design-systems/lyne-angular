import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import type { SbbCheckboxPanel } from '@sbb-esta/lyne-angular/checkbox-panel';
import { SbbCheckboxPanelModule } from '@sbb-esta/lyne-angular/checkbox-panel';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title sbb-checkbox-panel with configurable properties
 * @order 1
 */
@Component({
  selector: 'sbb-checkbox-panel-variants-example',
  templateUrl: 'checkbox-panel-showcase-example.html',
  styleUrl: 'checkbox-panel-showcase-example.scss',
  imports: [
    SbbCheckboxPanelModule,
    SbbCardModule,
    SbbCheckboxModule,
    SbbIconModule,
    SbbTitleModule,
    SbbRadioButtonModule,
    FormField,
  ],
})
export class CheckboxPanelShowcaseExample {
  protected controls = form(
    signal({
      size: null,
      color: 'white' as SbbCheckboxPanel['color'],
      checked: true,
      indeterminate: false,
      disabled: false,
      borderless: false,
    }),
  );
}
