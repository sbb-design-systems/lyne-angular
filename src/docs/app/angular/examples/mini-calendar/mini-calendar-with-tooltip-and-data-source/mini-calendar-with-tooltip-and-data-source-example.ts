import { JsonPipe } from '@angular/common';
import { Component, signal, type WritableSignal } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import {
  SbbMiniCalendarModule,
  SbbMiniCalendarDataSource,
  type SbbMiniCalendarDayConfig,
} from '@sbb-esta/lyne-angular/mini-calendar';
import { SbbTooltipModule } from '@sbb-esta/lyne-angular/tooltip';
import { defaultDateAdapter } from '@sbb-esta/lyne-elements/core.js';

/**
 * @title Mini-calendar with SbbMiniCalendarDataSource, ng-template and tooltip
 */
@Component({
  selector: 'sbb-mini-calendar-with-tooltip-and-data-source-example',
  templateUrl: 'mini-calendar-with-tooltip-and-data-source-example.html',
  imports: [SbbMiniCalendarModule, SbbTooltipModule, SbbButtonModule, JsonPipe],
})
export class MiniCalendarWithTooltipAndDataSourceExample {
  protected selectedDay = signal<SbbMiniCalendarDayConfig | null>(null);
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

  protected handleClick(day: WritableSignal<SbbMiniCalendarDayConfig>) {
    this.selectedDay.set(day());
  }
}
