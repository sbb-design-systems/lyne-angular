import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';

/**
 * @title radio-button-group with signal forms
 * @order 2
 */
@Component({
  selector: 'sbb-radio-button-group-signal-example',
  templateUrl: 'radio-button-group-signal-example.html',
  imports: [FormField, SbbRadioButtonModule, SbbCardModule],
})
export class RadioButtonGroupSignalExample {
  protected signalForm = form(signal({ radio: '1' }));
}
