import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbToggleCheckModule } from '@sbb-esta/lyne-angular/toggle-check';

/**
 * @title Toggle check with signal forms
 * @order 2
 */
@Component({
  selector: 'sbb-toggle-check-signal-example',
  templateUrl: 'toggle-check-signal-example.html',
  imports: [SbbToggleCheckModule, SbbCardModule, FormField],
})
export class ToggleCheckSignalExample {
  protected signalForm = form(signal({ checkbox: false }));
}
