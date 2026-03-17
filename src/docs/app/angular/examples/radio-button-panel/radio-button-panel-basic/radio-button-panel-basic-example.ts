import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbRadioButtonPanelModule } from '@sbb-esta/lyne-angular/radio-button-panel';

/**
 * @title Basic radio-button-panel
 */
@Component({
  selector: 'sbb-radio-button-panel-basic-example',
  templateUrl: 'radio-button-panel-basic-example.html',
  imports: [SbbRadioButtonPanelModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonPanelBasicExample {}
