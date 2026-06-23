import { Component, computed, signal, viewChild } from '@angular/core';
import { SbbDateInput, SbbDateInputModule } from '@sbb-esta/lyne-angular/date-input';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { defaultDateAdapter } from '@sbb-esta/lyne-elements/core.js';

/**
 * @title Basic date-input
 */
@Component({
  selector: 'sbb-date-input-basic-example',
  templateUrl: 'date-input-basic-example.html',
  imports: [SbbDateInputModule, SbbFormFieldModule],
})
export class DateInputBasicExample {
  protected readonly dateInput = viewChild.required(SbbDateInput);
  protected readonly dateValue = signal<string>('2024-12-12');
  protected readonly valueAsDate = computed(() => this.#internalCurrentDate());
  protected readonly valueISO8601 = computed(() => {
    const date = this.#internalCurrentDate();
    return date ? defaultDateAdapter.toIso8601(date) : 'null';
  });

  readonly #internalCurrentDate = signal<Date | null>(new Date('2024-12-12'));

  onInput(): void {
    this.#internalCurrentDate.set(this.dateInput().valueAsDate);
  }
}
