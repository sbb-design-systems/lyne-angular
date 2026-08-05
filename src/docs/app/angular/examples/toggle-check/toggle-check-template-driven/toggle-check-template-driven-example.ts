import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbToggleCheckModule } from '@sbb-esta/lyne-angular/toggle-check';

/**
 * @title Toggle check in a template-driven form
 * @order 4
 */
@Component({
  selector: 'sbb-toggle-check-template-driven-example',
  templateUrl: 'toggle-check-template-driven-example.html',
  imports: [SbbToggleCheckModule, FormsModule, SbbCardModule],
})
export class ToggleCheckTemplateDrivenExample {
  protected model = false;
}
