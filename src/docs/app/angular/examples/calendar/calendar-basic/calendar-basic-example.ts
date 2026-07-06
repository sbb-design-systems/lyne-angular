import { Component, computed, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbActionGroupModule } from '@sbb-esta/lyne-angular/action-group';
import type { SbbCalendar } from '@sbb-esta/lyne-angular/calendar';
import { SbbCalendarModule } from '@sbb-esta/lyne-angular/calendar';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic calendar
 * @order 1
 */
@Component({
  selector: 'sbb-calendar-basic-example',
  templateUrl: 'calendar-basic-example.html',
  imports: [
    FormField,
    SbbActionGroupModule,
    SbbCalendarModule,
    SbbCardModule,
    SbbCheckboxModule,
    SbbRadioButtonModule,
    SbbTitleModule,
  ],
})
export class CalendarBasicExample {
  protected form = form(
    signal<{
      calendar: Date | Date[];
    }>({ calendar: new Date() }),
  );

  protected stringifiedValue = computed(() => {
    const value = this.form.calendar().value();
    return value instanceof Array
      ? JSON.stringify(value.map((d) => d.toDateString()))
      : value.toDateString();
  });

  protected controls = form(
    signal({
      weekNumbers: false,
      multiple: false,
      disabled: false,
      view: 'day' as SbbCalendar['view'],
      orientation: 'horizontal' as SbbCalendar['orientation'],
    }),
  );
}
