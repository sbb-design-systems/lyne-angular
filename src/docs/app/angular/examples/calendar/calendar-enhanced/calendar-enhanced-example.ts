import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCalendarModule } from '@sbb-esta/lyne-angular/calendar';
import type { SbbMonthChangeEvent } from '@sbb-esta/lyne-elements/calendar.pure.js';

/**
 * @title Calendar with fixed month
 * @order 4
 */
@Component({
  selector: 'sbb-calendar-enhanced-example',
  templateUrl: './calendar-enhanced-example.html',
  styleUrl: './calendar-enhanced-example.scss',
  imports: [FormField, SbbCalendarModule],
})
export class CalendarEnhancedExample {
  protected form = form(signal({ calendar: new Date() }));

  daysOfMonth = signal<string[]>([]);

  protected onMonthChanged(event: SbbMonthChangeEvent): void {
    this.daysOfMonth.set(event.range.map((d) => d.value));
  }
}
