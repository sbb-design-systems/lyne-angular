import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbRadioButtonGroupModule } from '@sbb-esta/lyne-angular/radio-button-group';

/**
 * @title Basic radio-button-group
 */
@Component({
  selector: 'sbb-radio-button-group-basic-example',
  templateUrl: 'radio-button-group-basic-example.html',
  imports: [SbbRadioButtonGroupModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonGroupBasicExample {}
