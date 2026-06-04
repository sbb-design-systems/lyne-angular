import { Component } from '@angular/core';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbRadioButtonPanelModule } from '@sbb-esta/lyne-angular/radio-button-panel';
import { SbbSelectionExpansionPanelModule } from '@sbb-esta/lyne-angular/selection-expansion-panel';

/**
 * @title Basic selection-expansion-panel
 */
@Component({
  selector: 'sbb-selection-expansion-panel-basic-example',
  templateUrl: 'selection-expansion-panel-basic-example.html',
  imports: [
    SbbSelectionExpansionPanelModule,
    SbbRadioButtonPanelModule,
    SbbCardModule,
    SbbIconModule,
  ],
})
export class SelectionExpansionPanelBasicExample {}
