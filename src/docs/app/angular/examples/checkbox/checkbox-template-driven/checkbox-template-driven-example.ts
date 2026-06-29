import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';

/**
 * @title Checkbox in a template-driven form
 * @order 4
 */
@Component({
  selector: 'sbb-checkbox-template-driven-example',
  templateUrl: 'checkbox-template-driven-example.html',
  imports: [SbbCheckboxModule, FormsModule, SbbCardModule],
})
export class CheckboxTemplateDrivenExample {
  protected model = undefined;
}
