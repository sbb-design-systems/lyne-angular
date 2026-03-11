import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbCheckboxPanelModule } from '@sbb-esta/lyne-angular/checkbox-panel';

/**
 * @title Basic checkbox-panel
 */
@Component({
  selector: 'sbb-checkbox-panel-basic-example',
  templateUrl: 'checkbox-panel-basic-example.html',
  imports: [SbbCheckboxPanelModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxPanelBasicExample {}
