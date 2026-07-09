import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbDatepickerModule } from '@sbb-esta/lyne-angular/datepicker';

/**
 * @title datepicker connected with trigger
 * @order 3
 */
@Component({
  selector: 'sbb-datepicker-trigger-directive-example',
  templateUrl: 'datepicker-trigger-directive-example.html',
  imports: [SbbDatepickerModule, SbbButtonModule],
})
export class DatepickerTriggerDirectiveExample {}
