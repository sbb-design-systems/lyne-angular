import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxPanelModule } from '@sbb-esta/lyne-angular/checkbox-panel';
import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';

/**
 * @title sbb-checkbox-panel in a template-driven form
 * @order 3
 */
@Component({
  selector: 'sbb-checkbox-panel-template-driven-example',
  templateUrl: 'checkbox-panel-template-driven-example.html',
  styleUrl: 'checkbox-panel-template-driven-example.scss',
  imports: [FormsModule, SbbCheckboxPanelModule, SbbCardModule, SbbIconModule],
})
export class CheckboxPanelTemplateDrivenExample {
  protected model: boolean | null = null;
}
