import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import type { SbbExpansionPanel } from '@sbb-esta/lyne-angular/expansion-panel';
import { SbbExpansionPanelModule } from '@sbb-esta/lyne-angular/expansion-panel';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title expansion-panel with configurable properties
 * @order 1
 */
@Component({
  selector: 'sbb-expansion-panel-showcase-example',
  templateUrl: 'expansion-panel-showcase-example.html',
  imports: [
    FormField,
    SbbCheckboxModule,
    SbbExpansionPanelModule,
    SbbFormFieldModule,
    SbbRadioButtonModule,
    SbbTitleModule,
  ],
})
export class ExpansionPanelShowcaseExample {
  protected controls = form(
    signal({
      expanded: false,
      borderless: false,
      disabled: false,
      withIcon: false,
      size: null as SbbExpansionPanel['size'],
      color: 'white' as SbbExpansionPanel['color'],
    }),
  );
}
