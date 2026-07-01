import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbExpansionPanelModule } from '@sbb-esta/lyne-angular/expansion-panel';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import type { SbbExpansionPanelElement } from '@sbb-esta/lyne-elements/expansion-panel.pure.js';

/**
 * @title expansion-panel with configurable properties
 * @order 2
 */
@Component({
  selector: 'sbb-expansion-panel-variants-example',
  templateUrl: 'expansion-panel-variants-example.html',
  imports: [
    FormField,
    SbbCheckboxModule,
    SbbExpansionPanelModule,
    SbbFormFieldModule,
    SbbRadioButtonModule,
    SbbTitleModule,
  ],
})
export class ExpansionPanelVariantsExample {
  protected controls = form(
    signal({
      expanded: false,
      borderless: false,
      disabled: false,
      withIcon: false,
      size: null as SbbExpansionPanelElement['size'],
      color: 'white' as SbbExpansionPanelElement['color'],
    }),
  );
}
