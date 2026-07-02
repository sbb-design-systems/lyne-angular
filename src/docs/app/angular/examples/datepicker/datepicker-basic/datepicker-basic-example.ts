import { Component } from '@angular/core';
import { SbbDatepickerModule } from '@sbb-esta/lyne-angular/datepicker';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title Basic datepicker
 * @order 2
 */
@Component({
  selector: 'sbb-datepicker-basic-example',
  templateUrl: 'datepicker-basic-example.html',
  imports: [SbbDatepickerModule, SbbFormFieldModule],
})
export class DatepickerBasicExample {}
