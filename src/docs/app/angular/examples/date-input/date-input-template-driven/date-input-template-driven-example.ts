import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbDateInputModule } from '@sbb-esta/lyne-angular/date-input';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title date-input with template-driven form
 * @order 4
 */
@Component({
  selector: 'sbb-date-input-template-driven-example',
  templateUrl: 'date-input-template-driven-example.html',
  imports: [FormsModule, SbbCardModule, SbbFormFieldModule, SbbDateInputModule],
})
export class DateInputTemplateDrivenExample {
  protected model = new Date('2024-12-12');
}
