import { Component, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbDateInput } from '@sbb-esta/lyne-angular/date-input';
import { SbbDatepickerNextDay } from '@sbb-esta/lyne-angular/datepicker/datepicker-next-day';
import { SbbDatepickerPreviousDay } from '@sbb-esta/lyne-angular/datepicker/datepicker-previous-day';
import { SbbDatepickerToggle } from '@sbb-esta/lyne-angular/datepicker/datepicker-toggle';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import { defaultDateAdapter } from '@sbb-esta/lyne-elements/core/datetime.js';

import { SbbDatepicker } from './datepicker';

describe('sbb-datepicker', () => {
  let fixture: ComponentFixture<TestComponent>, component: TestComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Wait for the custom elements to be defined
    await Promise.resolve();
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('should select a date via datepicker toggle and update FormControl value', async () => {
    const datepickerToggle = (fixture.nativeElement as HTMLElement).querySelector(
      'sbb-datepicker-toggle',
    )!;

    datepickerToggle.open();

    // Simulate selecting a date in the calendar
    const calendarDay = datepickerToggle
      .shadowRoot!.querySelector('sbb-calendar')!
      .shadowRoot!.querySelector<HTMLButtonElement>('button[value="2025-04-01"]')!;

    calendarDay.click();

    // Assert that the FormControl value is updated
    expect(defaultDateAdapter.toIso8601(component.control.value!)).toEqual(
      defaultDateAdapter.toIso8601(new Date('2025-04-01')),
    );
  });

  it('previous and next day buttons should be enabled', async () => {
    const previousDay = (fixture.nativeElement as HTMLElement).querySelector(
      'sbb-datepicker-previous-day',
    )!;

    const nextDay = (fixture.nativeElement as HTMLElement).querySelector(
      'sbb-datepicker-next-day',
    )!;

    expect(previousDay.hasAttribute('data-disabled')).toBe(false);
    expect(nextDay.hasAttribute('data-disabled')).toBe(false);
  });

  it('next day button should be disabled', async () => {
    component.dateInput().max = new Date('2025-04-30');
    fixture.detectChanges();
    await Promise.resolve();

    const previousDay = (fixture.nativeElement as HTMLElement).querySelector(
      'sbb-datepicker-previous-day',
    )!;

    const nextDay = (fixture.nativeElement as HTMLElement).querySelector(
      'sbb-datepicker-next-day',
    )!;

    expect(previousDay.hasAttribute('data-disabled')).toBe(false);
    expect(nextDay.hasAttribute('data-disabled')).toBe(true);
  });
});

@Component({
  template: `<sbb-form-field>
    <sbb-date-input [formControl]="control"></sbb-date-input>
    <sbb-datepicker></sbb-datepicker>
    <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
    <sbb-datepicker-next-day></sbb-datepicker-next-day>
    <sbb-datepicker-toggle></sbb-datepicker-toggle>
  </sbb-form-field>`,
  imports: [
    SbbDateInput,
    SbbDatepicker,
    SbbDatepickerNextDay,
    SbbDatepickerPreviousDay,
    SbbDatepickerToggle,
    SbbFormField,
    ReactiveFormsModule,
  ],
})
class TestComponent {
  control = new FormControl(new Date('2025-04-30'));
  dateInput = viewChild.required(SbbDateInput<Date>);
}
