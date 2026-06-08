import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbRadioButtonPanelModule } from '@sbb-esta/lyne-angular/radio-button-panel';
import { SbbSelectionActionPanelModule } from '@sbb-esta/lyne-angular/selection-action-panel';

/**
 * @title Basic selection-action-panel
 */
@Component({
  selector: 'sbb-selection-action-panel-basic-example',
  templateUrl: 'selection-action-panel-basic-example.html',
  imports: [SbbSelectionActionPanelModule, SbbRadioButtonPanelModule, SbbButtonModule],
})
export class SelectionActionPanelBasicExample {}
