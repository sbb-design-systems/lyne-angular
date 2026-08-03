import { DatePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { form, FormField, max, min } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import {
  type SbbMiniCalendar,
  type SbbMiniCalendarDay,
  SbbMiniCalendarModule,
} from '@sbb-esta/lyne-angular/mini-calendar';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbSelectModule } from '@sbb-esta/lyne-angular/select';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Mini-calendar showcase
 */
@Component({
  selector: 'sbb-mini-calendar-showcase-example',
  templateUrl: 'mini-calendar-showcase-example.html',
  imports: [
    SbbMiniCalendarModule,
    SbbTitleModule,
    SbbRadioButtonModule,
    SbbCheckboxModule,
    FormField,
    DatePipe,
    SbbFormFieldModule,
    SbbSelectModule,
  ],
})
export class MiniCalendarShowcaseExample {
  protected readonly controls = form(
    signal({
      miniCalendar: {
        orientation: 'horizontal' as SbbMiniCalendar['orientation'],
        year: 2026,
        offset: 0,
        withTooltip: false,
      },
      day: {
        marker: null as SbbMiniCalendarDay['marker'] | null,
        color: null as SbbMiniCalendarDay['color'] | null,
      },
    }),
    (path) => {
      min(path.miniCalendar.offset, 0);
      max(path.miniCalendar.offset, 11);
    },
  );

  protected months = computed(() => {
    const year = this.controls.miniCalendar.year().value();
    const offset = this.controls.miniCalendar.offset().value();
    return Array.from({ length: 13 }, (_, m) => {
      const daysInMonth = new Date(year, m + offset + 1, 0).getDate();
      return Array.from({ length: daysInMonth }, (_, d) => new Date(year, m + offset, d + 1));
    });
  });
}
