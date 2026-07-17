import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';

/**
 * @title radio-button-group in a template driven form
 * @order 4
 */
@Component({
  selector: 'sbb-radio-button-group-template-driven-example',
  templateUrl: 'radio-button-group-template-driven-example.html',
  imports: [SbbRadioButtonModule, SbbCardModule, FormsModule],
})
export class RadioButtonGroupTemplateDrivenExample {
  protected model: string = '1';
}
