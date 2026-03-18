import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbDateInputModule } from '@sbb-esta/lyne-angular/date-input';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title Basic date-input
 */
@Component({
  selector: 'sbb-date-input-basic-example',
  templateUrl: 'date-input-basic-example.html',
  imports: [SbbDateInputModule, SbbFormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateInputBasicExample {}
