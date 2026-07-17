import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';

/**
 * @title radio-button-group in a reactive form
 * @order 3
 */
@Component({
  selector: 'sbb-radio-button-group-reactive-example',
  templateUrl: 'radio-button-group-reactive-example.html',
  imports: [SbbRadioButtonModule, SbbCardModule, ReactiveFormsModule],
})
export class RadioButtonGroupReactiveExample {
  protected control = new FormControl<string>('1');
}
