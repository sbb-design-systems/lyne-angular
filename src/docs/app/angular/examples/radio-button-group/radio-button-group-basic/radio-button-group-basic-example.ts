import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';

/**
 * @title Basic radio-button-group
 */
@Component({
  selector: 'sbb-radio-button-group-basic-example',
  templateUrl: 'radio-button-group-basic-example.html',
  imports: [SbbRadioButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonGroupBasicExample {}
