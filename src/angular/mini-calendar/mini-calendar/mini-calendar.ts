import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  NgZone,
  TemplateRef,
  contentChild,
  inject,
  signal,
} from '@angular/core';
import { SbbMiniCalendarElement } from '@sbb-esta/lyne-elements/mini-calendar.pure.js';

import { SbbMiniCalendarDay } from '../mini-calendar-day/mini-calendar-day';
import { SbbMiniCalendarMonth } from '../mini-calendar-month/mini-calendar-month';

import type { SbbMiniCalendarDataSource } from './mini-calendar-data-source';
import {
  SBB_MINI_CALENDAR_DAY_TEMPLATE,
  type SbbMiniCalendarDayTemplate,
} from './mini-calendar-day-template';

/**
 * It displays a minimal calendar, together with the `sbb-mini-calendar-month` and `sbb-mini-calendar-day`.
 *
 * @slot  - Use the unnamed slot to add `sbb-mini-calendar-month` elements.
 */
@Component({
  selector: 'sbb-mini-calendar',
  exportAs: 'sbbMiniCalendar',
  imports: [SbbMiniCalendarMonth, SbbMiniCalendarDay, NgTemplateOutlet],
  template: `
    @if (_dataSource(); as data) {
      @for (month of data.months; track month.value) {
        <sbb-mini-calendar-month [date]="month.value">
          @for (day of month.days; track day().date) {
            @if (dayTemplate(); as template) {
              <ng-container
                *ngTemplateOutlet="template; context: { $implicit: day }"
              ></ng-container>
            } @else {
              <sbb-mini-calendar-day
                [date]="day().date"
                [value]="day().value ?? ''"
                [marker]="day().marker ?? ''"
                [color]="day().color ?? ''"
                (click)="data['click']?.(day)"
              ></sbb-mini-calendar-day>
            }
          }
        </sbb-mini-calendar-month>
      }
    } @else {
      <ng-content></ng-content>
    }
  `,
})
export class SbbMiniCalendar<T = Date> {
  static {
    SbbMiniCalendarElement.define();
  }

  #element: ElementRef<SbbMiniCalendarElement<T>> = inject(ElementRef<SbbMiniCalendarElement<T>>);
  #ngZone: NgZone = inject(NgZone);
  protected dayTemplate = contentChild<SbbMiniCalendarDayTemplate, TemplateRef<unknown>>(
    SBB_MINI_CALENDAR_DAY_TEMPLATE,
    {
      read: TemplateRef,
    },
  );

  /**
   * The orientation of days in the calendar.
   */
  @Input()
  public set orientation(value: 'horizontal' | 'vertical') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.orientation = value));
  }
  public get orientation(): 'horizontal' | 'vertical' {
    return this.#element.nativeElement.orientation;
  }

  /**
   * The data source of the calendar. If not provided, the calendar will display
   * the months and days that are slotted in the component.
   */
  @Input()
  public set dataSource(value: SbbMiniCalendarDataSource | null) {
    this._dataSource.set(value);
  }
  public get dataSource(): SbbMiniCalendarDataSource | null {
    return this._dataSource();
  }
  protected _dataSource = signal<SbbMiniCalendarDataSource | null>(null);
}
