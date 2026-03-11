import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbSelectionExpansionPanelModule } from '@sbb-esta/lyne-angular/selection-expansion-panel';

/**
 * @title Basic selection-expansion-panel
 */
@Component({
  selector: 'sbb-selection-expansion-panel-basic-example',
  templateUrl: 'selection-expansion-panel-basic-example.html',
  imports: [SbbSelectionExpansionPanelModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionExpansionPanelBasicExample {}
