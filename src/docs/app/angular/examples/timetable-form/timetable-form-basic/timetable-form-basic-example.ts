import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbDatepickerModule } from '@sbb-esta/lyne-angular/datepicker';
import { SbbDividerModule } from '@sbb-esta/lyne-angular/divider';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbSignetModule } from '@sbb-esta/lyne-angular/signet';
import { SbbTimeInputModule } from '@sbb-esta/lyne-angular/time-input';
import { SbbTimetableFormModule } from '@sbb-esta/lyne-angular/timetable-form';
import { SbbToggleModule } from '@sbb-esta/lyne-angular/toggle';

/**
 * @title Basic timetable-form
 * @order 1
 */
@Component({
  selector: 'sbb-timetable-form-basic-example',
  templateUrl: 'timetable-form-basic-example.html',
  styleUrl: 'timetable-form-basic-example.scss',
  imports: [
    FormField,
    SbbButtonModule,
    SbbDatepickerModule,
    SbbDividerModule,
    SbbFormFieldModule,
    SbbTimeInputModule,
    SbbTimetableFormModule,
    SbbToggleModule,
    SbbSignetModule,
  ],
  host: { class: 'sbb-example-fullscreen' },
})
export class TimetableFormBasicExample {
  protected form = form(
    signal({
      from: '',
      to: '',
      date: new Date(),
      time: new Date(),
      departureArrival: 'departure' as 'departure' | 'arrival',
    }),
  );
}
