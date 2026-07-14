import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';
import { SbbRadioButtonPanelModule } from '@sbb-esta/lyne-angular/radio-button-panel';

/**
 * @title sbb-radio-button-panel in a template-driven form
 * @order 3
 */
@Component({
  selector: 'sbb-radio-button-panel-template-driven-example',
  templateUrl: 'radio-button-panel-template-driven-example.html',
  styleUrl: 'radio-button-panel-template-driven-example.scss',
  imports: [FormsModule, SbbRadioButtonPanelModule, SbbCardModule, SbbIconModule],
})
export class RadioButtonPanelTemplateDrivenExample {
  protected model: boolean | null = null;
}
