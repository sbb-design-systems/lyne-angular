import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCalendarModule } from '@sbb-esta/lyne-angular/calendar';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';
import type { SbbCalendarElement } from '@sbb-esta/lyne-elements/calendar.pure.js';

/**
 * @title Basic calendar
 * @order 1
 */
@Component({
  selector: 'sbb-calendar-basic-example',
  templateUrl: 'calendar-basic-example.html',
  styleUrl: 'calendar-basic-example.scss',
  imports: [SbbCalendarModule, SbbCheckboxModule, SbbRadioButtonModule, SbbTitleModule, FormField],
})
export class CalendarBasicExample {
  protected controls = form(
    signal({
      calendar: new Date(),
      weekNumbers: false,
      multiple: false,
      disabled: false,
      view: 'day' as SbbCalendarElement['view'],
      orientation: 'horizontal' as SbbCalendarElement['orientation'],
    }),
  );
}
