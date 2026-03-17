import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbCardBadge } from '@sbb-esta/lyne-angular/card';
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
    SbbCardBadge,
    SbbIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionExpansionPanelBasicExample {}
