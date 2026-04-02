import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbDateInputModule } from '@sbb-esta/lyne-angular/date-input';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title Basic date-input
 */
@Component({
  selector: 'sbb-date-input-basic-example',
  templateUrl: 'date-input-basic-example.html',
  imports: [SbbDateInputModule, SbbFormFieldModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateInputBasicExample {}
