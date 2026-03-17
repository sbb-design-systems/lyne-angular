import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbRadioButtonPanelModule } from '@sbb-esta/lyne-angular/radio-button-panel';
import { SbbSelectionActionPanelModule } from '@sbb-esta/lyne-angular/selection-action-panel';

/**
 * @title Basic selection-action-panel
 */
@Component({
  selector: 'sbb-selection-action-panel-basic-example',
  templateUrl: 'selection-action-panel-basic-example.html',
  imports: [SbbSelectionActionPanelModule, SbbRadioButtonPanelModule, SbbSecondaryButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionActionPanelBasicExample {}
