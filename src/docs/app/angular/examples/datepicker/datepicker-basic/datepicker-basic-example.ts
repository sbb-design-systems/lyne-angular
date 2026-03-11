import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbDatepickerModule } from '@sbb-esta/lyne-angular/datepicker';

/**
 * @title Basic datepicker
 */
@Component({
  selector: 'sbb-datepicker-basic-example',
  templateUrl: 'datepicker-basic-example.html',
  imports: [SbbDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerBasicExample {}
