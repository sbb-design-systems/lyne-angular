import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxPanelModule } from '@sbb-esta/lyne-angular/checkbox-panel';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbRadioButtonPanelModule } from '@sbb-esta/lyne-angular/radio-button-panel';
import { SbbSelectionActionPanelModule } from '@sbb-esta/lyne-angular/selection-action-panel';
import { SbbSelectionExpansionPanelModule } from '@sbb-esta/lyne-angular/selection-expansion-panel';

/**
 * @title `selection-action-panel` with expansion panel
 * @order 2
 */
@Component({
  selector: 'sbb-selection-action-panel-with-expansion-example',
  templateUrl: 'selection-action-panel-with-expansion-example.html',
  imports: [
    SbbButtonModule,
    SbbCardModule,
    SbbCheckboxPanelModule,
    SbbLinkModule,
    SbbSelectionActionPanelModule,
    SbbSelectionExpansionPanelModule,
    SbbRadioButtonPanelModule,
  ],
})
export class SelectionActionPanelWithExpansionExample {}
