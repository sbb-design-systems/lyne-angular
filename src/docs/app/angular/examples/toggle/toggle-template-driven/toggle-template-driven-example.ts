import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbToggleModule } from '@sbb-esta/lyne-angular/toggle';

/**
 * @title sbb-toggle with template-driven forms
 * @order 4
 */
@Component({
  selector: 'sbb-toggle-template-driven-example',
  templateUrl: 'toggle-template-driven-example.html',
  imports: [SbbToggleModule, SbbCardModule, FormsModule],
})
export class ToggleTemplateDrivenExample {
  protected model = 'Bern';
}
