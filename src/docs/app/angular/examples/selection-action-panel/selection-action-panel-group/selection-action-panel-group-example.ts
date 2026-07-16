import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbRadioButtonPanelModule } from '@sbb-esta/lyne-angular/radio-button-panel';
import { SbbSelectionActionPanelModule } from '@sbb-esta/lyne-angular/selection-action-panel';

/**
 * @title selection-action-panel in a group
 * @order 3
 */
@Component({
  selector: 'sbb-selection-action-panel-group-example',
  templateUrl: 'selection-action-panel-group-example.html',
  imports: [
    SbbCardModule,
    SbbSelectionActionPanelModule,
    SbbRadioButtonPanelModule,
    SbbButtonModule,
  ],
})
export class SelectionActionPanelGroupExample {}
