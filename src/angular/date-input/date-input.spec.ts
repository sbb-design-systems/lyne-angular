import { Component, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { defaultDateAdapter } from '@sbb-esta/lyne-elements/core/datetime.js';
import type { SbbDateInputElement } from '@sbb-esta/lyne-elements/date-input.js';

import { SbbDateInput } from './date-input';

describe('sbb-date-input', () => {
  let fixture: ComponentFixture<TestComponent>,
    component: TestComponent,
    lyneElement: SbbDateInputElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
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
    expect(component.control.valid).toBeTrue();

    lyneElement.textContent = 'invalid';
    lyneElement.dispatchEvent(new InputEvent('beforeinput'));
    lyneElement.dispatchEvent(new InputEvent('input'));

    expect(component.control.valid).toBeFalse();
  });

  it('should validate on invalid event', async () => {
    expect(component.control.valid).toBeTrue();

    lyneElement.value = 'invalid';
    lyneElement.dispatchEvent(new Event('invalid'));

    expect(component.control.valid).toBeFalse();
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
    expect(dateInput.value).toEqual('undefined');
  });

  it('should be touched on blur', async () => {
    expect(component.control.touched).toBeFalse();

    (fixture.nativeElement as HTMLElement)
      .querySelector('sbb-date-input')!
      .dispatchEvent(new FocusEvent('blur'));

    expect(component.control.touched).toBeTrue();
  });

  it('should have correct state with user input', async () => {
    expect(component.control.valid).toBeTrue();

    lyneElement.dispatchEvent(new InputEvent('beforeinput'));
    lyneElement.textContent = '12.12.2025';
    lyneElement.dispatchEvent(new InputEvent('input'));

    expect(component.control.valid).toBeTrue();
    expect(component.control.value).not.toBeNull();
    expect(component.control.value).toEqual(new Date('2025-12-12T00:00:00'));
  });
});

@Component({
  template: `<sbb-date-input [formControl]="control"></sbb-date-input>`,
  imports: [SbbDateInput, ReactiveFormsModule],
})
class TestComponent {
  dateInput = viewChild.required(SbbDateInput<Date>);
  control = new FormControl(new Date('2025-04-30'));
  valueChangeCount = 0;

  constructor() {
    this.control.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.valueChangeCount++);
  }
}
