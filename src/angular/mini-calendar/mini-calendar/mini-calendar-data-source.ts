import { signal, type WritableSignal } from '@angular/core';
import { type DateAdapter, defaultDateAdapter } from '@sbb-esta/lyne-elements/core.js';
import type { SbbMiniCalendarDayElement } from '@sbb-esta/lyne-elements/mini-calendar.pure.js';

type Nullable<T> = {
  [P in keyof T]?: T[P] | null;
};

export type SbbMiniCalendarDayConfig = Readonly<Pick<SbbMiniCalendarDayElement, 'date'>> &
  Nullable<Pick<SbbMiniCalendarDayElement, 'value' | 'marker' | 'color'>>;

export interface SbbMiniCalendarMonthRange {
  readonly value: string;
  readonly days: readonly WritableSignal<SbbMiniCalendarDayConfig>[];
}

export interface SbbMiniCalendarDataSourceConfig<T> {
  /** The first month of the data source, in the format YYYY-MM. */
  from: string;
  /** The last month of the data source, in the format YYYY-MM. */
  to: string;
  /**
   * A function that creates a day configuration for the given date.
   * If not provided, the default configuration will be used.
   */
  create?: (date: T) => SbbMiniCalendarDayConfig;
  /**
   * Called when a day is clicked.
   * @param day The day that was clicked.
   * @returns void
   */
  click?: (day: WritableSignal<SbbMiniCalendarDayConfig>) => void;
  dateAdapter?: DateAdapter<T>;
}

export class SbbMiniCalendarDataSource<T = Date> {
  readonly months: readonly SbbMiniCalendarMonthRange[];
  protected readonly click?: (day: WritableSignal<SbbMiniCalendarDayConfig>) => void;
  #dateAdapter: DateAdapter<T> = defaultDateAdapter as unknown as DateAdapter<T>;

  constructor(config: SbbMiniCalendarDataSourceConfig<T>) {
    this.#dateAdapter = config.dateAdapter ?? (defaultDateAdapter as unknown as DateAdapter<T>);
    this.click = config.click;
    this.months = this.#createMonths(config);
  }

  /**
   * Returns the day corresponding to the given date, or null if the date is not in the range of the data source.
   */
  findDay(date: T): WritableSignal<SbbMiniCalendarDayConfig> | null {
    const month = `${this.#dateAdapter.getYear(date)}-${this.#pad(this.#dateAdapter.getMonth(date))}`;
    const monthRange = this.months.find((m) => m.value === month);
    if (!monthRange) {
      return null;
    }
    const day = this.#pad(this.#dateAdapter.getDate(date));
    return monthRange.days.find((d) => d().date === `${month}-${day}`) ?? null;
  }

  #createMonths(config: SbbMiniCalendarDataSourceConfig<T>) {
    const { from, to } = config;
    if (!this.#validateYearMonth(from)) {
      throw new Error('Invalid from month');
    } else if (!this.#validateYearMonth(to)) {
      throw new Error('Invalid to month');
    }

    const [fromYear, fromMonth] = from.split('-').map((v) => parseInt(v, 10));
    const [toYear, toMonth] = to.split('-').map((v) => parseInt(v, 10));

    const months: SbbMiniCalendarMonthRange[] = [];
    let current = this.#dateAdapter.createDate(fromYear, fromMonth, 1);
    const end = this.#dateAdapter.createDate(toYear, toMonth, 1);
    while (this.#dateAdapter.compareDate(current, end) <= 0) {
      const year = this.#dateAdapter.getYear(current);
      const month = this.#dateAdapter.getMonth(current);
      const value = `${year}-${this.#pad(month)}`;
      const days: WritableSignal<SbbMiniCalendarDayConfig>[] = [];
      for (let i = 1; i <= this.#dateAdapter.getNumDaysInMonth(current); i++) {
        const date = this.#dateAdapter.createDate(year, month, i);
        days.push(
          signal(
            config.create?.(date) ?? {
              date: `${year}-${this.#pad(month)}-${this.#pad(i)}`,
            },
          ),
        );
      }

      months.push({ value, days });
      current = this.#dateAdapter.addCalendarMonths(current, 1);
    }
    return months;
  }

  #validateYearMonth(value: string) {
    const parts = value.split('-');
    const [year, month] = parts.map((v) => parseInt(v, 10));
    return parts.length === 2 && !isNaN(year) && !isNaN(month) && month >= 1 && month <= 12;
  }

  #pad(value: number): string {
    return String(value).padStart(2, '0');
  }
}
