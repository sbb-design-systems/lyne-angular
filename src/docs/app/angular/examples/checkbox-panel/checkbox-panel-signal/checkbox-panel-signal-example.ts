import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxPanelModule } from '@sbb-esta/lyne-angular/checkbox-panel';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';

/**
 * @title sbb-checkbox-panel in a signal form
 * @order 2
 */
@Component({
  selector: 'sbb-checkbox-panel-signal-example',
  templateUrl: 'checkbox-panel-signal-example.html',
  styleUrl: 'checkbox-panel-signal-example.scss',
  imports: [FormField, SbbCheckboxPanelModule, SbbCardModule, SbbIconModule],
})
export class CheckboxPanelSignalExample {
  protected control = form(signal({ checkbox: false }));
}
