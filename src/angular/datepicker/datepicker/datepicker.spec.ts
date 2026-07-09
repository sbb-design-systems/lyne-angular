import { Component, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbDateInput } from '@sbb-esta/lyne-angular/date-input';
import {
  SbbDatepickerNextDay,
  SbbDatepickerPreviousDay,
  SbbDatepickerToggle,
} from '@sbb-esta/lyne-angular/datepicker';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
import type { SbbCalendarDayElement } from '@sbb-esta/lyne-elements/calendar.pure.js';
import { waitForLitRender } from '@sbb-esta/lyne-elements/core/testing.js';
import { defaultDateAdapter } from '@sbb-esta/lyne-elements/core.js';

import { SbbDatepicker } from './datepicker';
import { SbbDatepickerTrigger } from './datepicker-trigger';

describe('sbb-datepicker', () => {
  describe('form field usage', () => {
    let fixture: ComponentFixture<TestComponent>, component: TestComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', async () => {
      expect(component).toBeDefined();
    });

    it('should select a date via datepicker toggle and update FormControl value', async () => {
      const datepicker = component.datepickerToggle().datepicker!;

      datepicker.open();

      // The sbb-calendar inside the datepicker is instantiated a tick later for performance reasons.
      // We have to wait for the update to be completed to have it ready.
      await waitForLitRender(datepicker);

      // Simulate selecting a date in the calendar
      const calendarDay = datepicker
        .shadowRoot!.querySelector('sbb-calendar')!
        .shadowRoot!.querySelector<SbbCalendarDayElement>('sbb-calendar-day[slot="2025-04-01"]')!;

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

      expect(previousDay.disabled).toBe(false);
      expect(nextDay.disabled).toBe(true);
    });
  });

  describe('standalone usage with trigger', () => {
    let fixture: ComponentFixture<TestSbbDatepickerTrigger>, component: TestSbbDatepickerTrigger;

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestSbbDatepickerTrigger);
      component = fixture.componentInstance;
      fixture.detectChanges();
      await waitForLitRender(fixture.nativeElement);
    });

    it('should create', async () => {
      expect(component).toBeDefined();
    });

    it('datepicker should open when correctly connected', async () => {
      expect(component.datepicker().isOpen).toBe(false);
      fixture.nativeElement.querySelector('sbb-secondary-button')!.click();
      expect(component.datepicker().isOpen).toBe(true);
    });
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
  datepickerToggle = viewChild.required(SbbDatepickerToggle);
}

@Component({
  template: `
    <sbb-secondary-button [sbbDatepicker]="picker">Open Datepicker</sbb-secondary-button>
    <sbb-datepicker #picker="sbbDatepicker"></sbb-datepicker>
  `,
  imports: [SbbDatepicker, SbbDatepickerTrigger, SbbButtonModule],
})
class TestSbbDatepickerTrigger {
  datepicker = viewChild.required(SbbDatepicker);
}
