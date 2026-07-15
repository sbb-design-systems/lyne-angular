import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbCheckboxPanelModule } from '@sbb-esta/lyne-angular/checkbox-panel';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { type SbbRadioButtonGroup } from '@sbb-esta/lyne-angular/radio-button-group';
import {
  type SbbRadioButtonPanel,
  SbbRadioButtonPanelModule,
} from '@sbb-esta/lyne-angular/radio-button-panel';
import { SbbSelectionExpansionPanelModule } from '@sbb-esta/lyne-angular/selection-expansion-panel';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title selection-expansion-panel showcase
 * @order 1
 */
@Component({
  selector: 'sbb-selection-expansion-panel-showcase-example',
  templateUrl: 'selection-expansion-panel-showcase-example.html',
  styleUrl: 'selection-expansion-panel-showcase-example.scss',
  imports: [
    FormField,
    SbbCheckboxModule,
    SbbCheckboxPanelModule,
    SbbCardModule,
    SbbIconModule,
    SbbRadioButtonModule,
    SbbRadioButtonPanelModule,
    SbbSelectionExpansionPanelModule,
    SbbTitleModule,
  ],
})
export class SelectionExpansionPanelShowcaseExample {
  protected controls = form(
    signal({
      forceOpen: false,
      borderless: false,
      disabled: false,
      color: 'white' as SbbRadioButtonPanel['color'],
      size: null as SbbRadioButtonGroup['size'],
    }),
  );
}
