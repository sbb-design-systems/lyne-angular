import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';

/**
 * @title Select in a template-driven form
 * @order 12
 */
@Component({
  selector: 'sbb-select-template-driven-example',
  templateUrl: 'select-template-driven-example.html',
  imports: [FormsModule, SbbCardModule, SbbFormFieldModule, SbbSelectModule],
})
export class SelectTemplateDrivenExample {
  protected model: string | null = null;
}
