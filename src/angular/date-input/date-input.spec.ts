import { Component, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { form, FormField, maxDate, minDate } from '@angular/forms/signals';
import { defaultDateAdapter } from '@sbb-esta/lyne-elements/core.js';
import type { SbbDateInputElement } from '@sbb-esta/lyne-elements/date-input.pure.js';

import { SbbDateInput } from './date-input';
import { dateFilter } from './date-input-filter';
import { SbbDateInputModule } from './date-input.module';

describe('sbb-date-input', () => {
  describe('signal forms', () => {
    let fixture: ComponentFixture<SignalTestComponent>,
      component: SignalTestComponent,
      element: SbbDateInputElement;

    beforeEach(async () => {
      fixture = TestBed.createComponent(SignalTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      element = (fixture.nativeElement as HTMLElement).querySelector('sbb-date-input')!;
    });

    it('should create', async () => {
      expect(component).toBeDefined();
    });

    it('should handle formField', async () => {
      expect(element.textContent).toEqual('We, 30.04.2025');
      const oldValue = component.control().value();

      component.dateInput().value = '2025-05-01';
      element.dispatchEvent(new Event('change'));

      expect(component.control().value()).not.toBe(oldValue);
    });

    it('should handle writeValue via signal', async () => {
      const dateInput = component.dateInput();

      // Test with a valid date instance
      const validDate = new Date('2025-06-01');
      component.control().value.set(validDate);
      await fixture.whenStable();
      expect(defaultDateAdapter.toIso8601(dateInput.valueAsDate!)).toEqual(
        defaultDateAdapter.toIso8601(validDate),
      );

      // Test with null
      component.control().value.set(null);
      await fixture.whenStable();
      expect(dateInput.valueAsDate).toBeNull();
      expect(dateInput.value).toEqual('');
    });

    it('should be touched on blur', () => {
      (fixture.nativeElement as HTMLElement)
        .querySelector('sbb-date-input')!
        .dispatchEvent(new FocusEvent('blur'));

      expect(component.control().touched()).toBe(true);
    });

    it('should have correct state with user input', () => {
      element.dispatchEvent(new InputEvent('beforeinput'));
      element.textContent = '12.12.2025';
      element.dispatchEvent(new InputEvent('input'));

      expect(component.control().value()).toEqual(new Date('2025-12-12T00:00:00'));
    });

    it('should be invalid and have errors when user types 12345', () => {
      element.dispatchEvent(new InputEvent('beforeinput'));
      element.textContent = 'bad input';
      element.dispatchEvent(new InputEvent('input'));

      expect(component.control().valid()).toBe(false);
      expect(component.control().errors()).not.toBeNull();
    });

    it('should sync min', async () => {
      component.minDate.set(new Date('2025-01-01'));
      await fixture.whenStable();
      expect(element).toHaveAttribute('min', '2025-01-01');
      component.minDate.set(undefined);
      await fixture.whenStable();
      expect(element).not.toHaveAttribute('min');
    });

    it('should sync max', async () => {
      component.maxDate.set(new Date('2025-12-31'));
      await fixture.whenStable();
      expect(element).toHaveAttribute('max', '2025-12-31');
      component.maxDate.set(undefined);
      await fixture.whenStable();
      expect(element).not.toHaveAttribute('max');
    });

    it('should sync date filter', async () => {
      // Only allow monday
      const dateFilter = (date: Date) => date.getDay() === 1;
      component.dateFilter.set(dateFilter);
      await fixture.whenStable();
      expect(element.dateFilter).toBe(dateFilter);
      expect(component.control().errors().length).toBe(1);
      const [error] = component.control().errors();
      expect(error.kind).toEqual('sbbDateFilter');
      component.dateFilter.set(() => true);
      await fixture.whenStable();
      expect(component.control().errors()).toEqual([]);
    });
  });

  describe('reactive forms', () => {
    let fixture: ComponentFixture<ReactiveTestComponent>,
      component: ReactiveTestComponent,
      lyneElement: SbbDateInputElement;

    beforeEach(async () => {
      fixture = TestBed.createComponent(ReactiveTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      lyneElement = (fixture.nativeElement as HTMLElement).querySelector('sbb-date-input')!;
    });

    it('should create', async () => {
      expect(component).toBeDefined();
    });

    it('should not initially emit valueChange', async () => {
      expect(component).toBeDefined();
      expect(component.valueChangeCount).toEqual(0);
    });

    it('should handle formControl', async () => {
      expect(lyneElement.textContent).toEqual('We, 30.04.2025');
      const oldValue = component.control.value;

      component.dateInput().value = '2025-05-01';
      lyneElement.dispatchEvent(new Event('change'));

      expect(component.control.value).not.toBe(oldValue);
    });

    it('should validate on user input', async () => {
      expect(component.control.valid).toBe(true);

      lyneElement.textContent = 'invalid';
      lyneElement.dispatchEvent(new InputEvent('beforeinput'));
      lyneElement.dispatchEvent(new InputEvent('input'));

      expect(component.control.valid).toBe(false);
    });

    it('should validate on invalid event', async () => {
      expect(component.control.valid).toBe(true);

      lyneElement.value = 'invalid';
      lyneElement.dispatchEvent(new Event('invalid'));

      expect(component.control.valid).toBe(false);
    });

    it('should handle parseValidator', async () => {
      component.dateInput().value = 'invalid';

      expect(component.control.errors).toEqual({ sbbDateParse: { text: 'invalid' } });
    });

    it('should handle minValidator', async () => {
      const dateInput = component.dateInput();
      dateInput.min = new Date('2026-01-01');

      expect(defaultDateAdapter.toIso8601(dateInput.valueAsDate!)).toEqual('2025-04-30');

      const errors = component.control.errors!;
      expect(Object.keys(errors)).toEqual(['sbbDateMin']);
      expect(errors['sbbDateMin'].min).toEqual(dateInput.min);
      expect(errors['sbbDateMin'].actual).toEqual(dateInput.valueAsDate);
    });

    it('should handle maxValidator when changing valueAsDate', async () => {
      const dateInput = component.dateInput();
      dateInput.max = new Date('2025-05-01');

      expect(defaultDateAdapter.toIso8601(dateInput.valueAsDate!)).toEqual('2025-04-30');

      dateInput.valueAsDate = new Date('2025-05-02'); // Set a date that exceeds the max

      const errors = component.control.errors!;
      expect(Object.keys(errors)).toEqual(['sbbDateMax']);
      expect(errors['sbbDateMax'].max).toEqual(dateInput.max);
      expect(errors['sbbDateMax'].actual).toEqual(dateInput.valueAsDate);
    });

    it('should handle maxValidator', async () => {
      const dateInput = component.dateInput();
      dateInput.max = new Date('2024-01-01');

      expect(defaultDateAdapter.toIso8601(dateInput.valueAsDate!)).toEqual('2025-04-30');

      const errors = component.control.errors!;
      expect(Object.keys(errors)).toEqual(['sbbDateMax']);
      expect(errors['sbbDateMax'].max).toEqual(dateInput.max);
      expect(errors['sbbDateMax'].actual).toEqual(dateInput.valueAsDate);
    });

    it('should handle dateFilter', async () => {
      const dateInput = component.dateInput();
      dateInput.dateFilter = () => false;

      expect(defaultDateAdapter.toIso8601(dateInput.valueAsDate!)).toEqual('2025-04-30');

      const errors = component.control.errors!;
      expect(Object.keys(errors)).toEqual(['sbbDateFilter']);
    });

    it('should handle writeValue via FormControl', async () => {
      const dateInput = component.dateInput();
      const control = component.control;

      // Test with a valid date instance
      const validDate = new Date('2025-06-01');
      control.setValue(validDate);
      expect(defaultDateAdapter.toIso8601(dateInput.valueAsDate!)).toEqual(
        defaultDateAdapter.toIso8601(validDate),
      );

      // Test with an invalid date string
      const invalidDateString = 'invalid-date';
      control.setValue(invalidDateString as unknown as Date);
      expect(dateInput.value).toEqual(invalidDateString);
      expect(dateInput.valueAsDate).toBeNull();

      // Test with null
      control.setValue(null);
      expect(dateInput.valueAsDate).toBeNull();
      expect(dateInput.value).toEqual('');

      // Test with undefined
      control.setValue(undefined as unknown as Date);
      expect(dateInput.valueAsDate).toBeNull();
      expect(dateInput.value).toEqual('');
    });

    it('should be touched on blur', async () => {
      expect(component.control.touched).toBe(false);

      (fixture.nativeElement as HTMLElement)
        .querySelector('sbb-date-input')!
        .dispatchEvent(new FocusEvent('blur'));

      expect(component.control.touched).toBe(true);
    });

    it('should have correct state with user input', async () => {
      expect(component.control.valid).toBe(true);

      lyneElement.dispatchEvent(new InputEvent('beforeinput'));
      lyneElement.textContent = '12.12.2025';
      lyneElement.dispatchEvent(new InputEvent('input'));

      expect(component.control.valid).toBe(true);
      expect(component.control.value).not.toBeNull();
      expect(component.control.value).toEqual(new Date('2025-12-12T00:00:00'));
    });

    it('should be invalid and have errors when user types 12345', async () => {
      lyneElement.dispatchEvent(new InputEvent('beforeinput'));
      lyneElement.textContent = 'bad input';
      lyneElement.dispatchEvent(new InputEvent('input'));

      expect(component.control.valid).toBe(false);
      expect(component.control.errors).not.toBeNull();
    });
  });
});

@Component({
  template: `<sbb-date-input [formField]="control"></sbb-date-input>`,
  imports: [SbbDateInputModule, FormField],
})
class SignalTestComponent {
  dateInput = viewChild.required(SbbDateInput<Date>);
  minDate = signal<Date | undefined>(undefined);
  maxDate = signal<Date | undefined>(undefined);
  dateFilter = signal<(date: Date) => boolean>(() => true);
  control = form(signal<Date | null>(new Date('2025-04-30')), (s) => {
    minDate(s, this.minDate);
    maxDate(s, this.maxDate);
    dateFilter(s, this.dateFilter);
  });
}

@Component({
  template: `<sbb-date-input [formControl]="control"></sbb-date-input>`,
  imports: [SbbDateInputModule, ReactiveFormsModule],
})
class ReactiveTestComponent {
  dateInput = viewChild.required(SbbDateInput<Date>);
  control = new FormControl(new Date('2025-04-30'));
  valueChangeCount = 0;

  constructor() {
    this.control.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.valueChangeCount++);
  }
}
