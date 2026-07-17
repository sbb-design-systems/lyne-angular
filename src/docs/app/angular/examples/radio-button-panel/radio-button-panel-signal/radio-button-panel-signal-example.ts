import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbRadioButtonPanelModule } from '@sbb-esta/lyne-angular/radio-button-panel';

/**
 * @title radio-button-panel with signal forms
 * @order 2
 */
@Component({
  selector: 'sbb-radio-button-panel-signal-example',
  templateUrl: 'radio-button-panel-signal-example.html',
  styleUrl: 'radio-button-panel-signal-example.scss',
  imports: [FormField, SbbRadioButtonPanelModule, SbbCardModule, SbbIconModule],
})
export class RadioButtonPanelSignalExample {
  protected signalForm = form(signal({ radio: '1' }));
}
