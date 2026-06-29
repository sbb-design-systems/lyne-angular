import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';

/**
 * @title Checkbox with signal forms
 * @order 2
 */
@Component({
  selector: 'sbb-checkbox-signal-example',
  templateUrl: 'checkbox-signal-example.html',
  imports: [SbbCheckboxModule, SbbCardModule, FormField],
})
export class CheckboxSignalExample {
  protected signalForm = form(signal({ checkbox: null }));
}
