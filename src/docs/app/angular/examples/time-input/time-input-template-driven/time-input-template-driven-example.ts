import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbTimeInputModule } from '@sbb-esta/lyne-angular/time-input';

/**
 * @title time-input with template-driven form
 * @order 4
 */
@Component({
  selector: 'sbb-time-input-template-driven-example',
  templateUrl: 'time-input-template-driven-example.html',
  imports: [FormsModule, SbbCardModule, SbbFormFieldModule, SbbTimeInputModule],
})
export class TimeInputTemplateDrivenExample {
  protected model = new Date('1900-01-01T15:15');
}
