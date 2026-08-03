import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbToggleModule } from '@sbb-esta/lyne-angular/toggle';

/**
 * @title sbb-toggle with signal forms
 * @order 2
 */
@Component({
  selector: 'sbb-toggle-signal-example',
  templateUrl: 'toggle-signal-example.html',
  imports: [SbbToggleModule, SbbCardModule, FormField],
})
export class ToggleSignalExample {
  protected signalForm = form(signal({ toggle: 'Bern' }));
}
