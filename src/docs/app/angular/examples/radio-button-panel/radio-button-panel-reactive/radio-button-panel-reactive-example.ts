import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbRadioButtonPanelModule } from '@sbb-esta/lyne-angular/radio-button-panel';

/**
 * @title sbb-radio-button-panel in a reactive form
 * @order 3
 */
@Component({
  selector: 'sbb-radio-button-panel-reactive-example',
  templateUrl: 'radio-button-panel-reactive-example.html',
  styleUrl: 'radio-button-panel-reactive-example.scss',
  imports: [ReactiveFormsModule, SbbRadioButtonPanelModule, SbbCardModule, SbbIconModule],
})
export class RadioButtonPanelReactiveExample {
  protected control = new FormControl<boolean | null>(null);
}
