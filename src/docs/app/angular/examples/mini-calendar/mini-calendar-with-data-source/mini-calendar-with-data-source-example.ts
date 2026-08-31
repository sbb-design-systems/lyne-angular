import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import {
  SbbMiniCalendarModule,
  SbbMiniCalendarDataSource,
  type SbbMiniCalendarDayConfig,
} from '@sbb-esta/lyne-angular/mini-calendar';
import { defaultDateAdapter } from '@sbb-esta/lyne-elements/core.js';

/**
 * @title Mini-calendar with SbbMiniCalendarDataSource
 */
@Component({
  selector: 'sbb-mini-calendar-with-data-source-example',
  templateUrl: 'mini-calendar-with-data-source-example.html',
  imports: [SbbMiniCalendarModule, SbbButtonModule],
})
export class MiniCalendarWithDataSourceExample {
  private _dateAdapter = defaultDateAdapter;

  protected dataSource = new SbbMiniCalendarDataSource({
    from: '2024-01',
    to: '2024-12',
    create: (date) => {
      const day = date.getDate();
      const marker = day % 5 === 0 ? 'target' : null;
      const color = day % 3 === 0 ? 'orange' : null;
      return { date: this._dateAdapter.toIso8601(date), marker, color };
    },
  });

  protected startDayIteration() {
    let activeDate = this._dateAdapter.createDate(2024, 1, 1);
    let previousDate: Date | null = null;
    let original: SbbMiniCalendarDayConfig | null = null;
    setInterval(() => {
      if (previousDate && original) {
        const day = this.dataSource.findDay(previousDate)!;
        day.set(original);
      }

      const day = this.dataSource.findDay(activeDate)!;
      original = day();
      day.update((d) => ({ ...d, marker: 'target', color: 'red' }));

      previousDate = activeDate;
      activeDate = this._dateAdapter.addCalendarDays(activeDate, 1);
      if (this._dateAdapter.getYear(activeDate) > 2024) {
        activeDate = this._dateAdapter.createDate(2024, 1, 1);
      }
    }, 50);
  }
}
