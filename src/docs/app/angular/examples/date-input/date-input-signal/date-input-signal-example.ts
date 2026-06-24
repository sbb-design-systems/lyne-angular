import { Component, signal } from '@angular/core';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbDateInputModule } from '@sbb-esta/lyne-angular/date-input';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import type { SbbDateInputElement } from '@sbb-esta/lyne-elements/date-input.pure.js';

/**
 * @title date-input with signals
 * @order 1
 */
@Component({
  selector: 'sbb-date-input-signal-example',
  templateUrl: 'date-input-signal-example.html',
  imports: [SbbDateInputModule, SbbFormFieldModule, SbbCardModule],
})
export class DateInputSignalExample {
  protected readonly value = signal<Date>(new Date('2024-12-12'));
  protected dateValueSignal = signal<Date | null>(new Date('2024-12-12'));

  protected onInput(event: InputEvent): void {
    this.dateValueSignal.set((event.target as SbbDateInputElement).valueAsDate);
  }
}
