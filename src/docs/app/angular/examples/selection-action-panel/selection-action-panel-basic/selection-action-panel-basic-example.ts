import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxPanelModule } from '@sbb-esta/lyne-angular/checkbox-panel';
import { SbbRadioButtonPanelModule } from '@sbb-esta/lyne-angular/radio-button-panel';
import { SbbSelectionActionPanelModule } from '@sbb-esta/lyne-angular/selection-action-panel';

/**
 * @title Basic selection-action-panel
 * @order 1
 */
@Component({
  selector: 'sbb-selection-action-panel-basic-example',
  templateUrl: 'selection-action-panel-basic-example.html',
  imports: [
    SbbCardModule,
    SbbCheckboxPanelModule,
    SbbSelectionActionPanelModule,
    SbbRadioButtonPanelModule,
    SbbButtonModule,
  ],
})
export class SelectionActionPanelBasicExample {}
