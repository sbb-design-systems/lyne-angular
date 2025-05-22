import { Component, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { defaultDateAdapter } from '@sbb-esta/lyne-elements/core/datetime.js';
import type { SbbTimeInputElement } from '@sbb-esta/lyne-elements/time-input.js';

import { SbbTimeInput } from './time-input';

describe('sbb-time-input', () => {
  let fixture: ComponentFixture<TestComponent>,
    component: TestComponent,
    lyneElement: SbbTimeInputElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lyneElement = (fixture.nativeElement as HTMLElement).querySelector('sbb-time-input')!;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('should handle formControl', async () => {
    expect(lyneElement.textContent).toEqual('14:48');
    const oldValue = component.control.value;

    component.timeInput().value = '15:20';
    lyneElement.dispatchEvent(new Event('change'));

    expect(component.control.value).not.toBe(oldValue);
  });

  it('should validate on user input', async () => {
    expect(component.control.valid).toBeTrue();

    lyneElement.textContent = 'invalid';
    lyneElement.dispatchEvent(new Event('input'));

    expect(component.control.valid).toBeFalse();
  });

  // TODO: find way to test it
  xit('should validate on invalid event', async () => {
    expect(component.control.valid).toBeTrue();

    lyneElement.value = 'invalid';
    lyneElement.dispatchEvent(new Event('invalid'));

    expect(lyneElement.value).toBe('invalid');
    expect(component.control.valid).toBeFalse();
  });

  // TODO: find way to test it
  xit('should handle parseValidator', async () => {
    component.timeInput().value = 'invalid';

    expect(component.control.errors).toEqual({ sbbTimeParse: { text: 'invalid' } });
  });

  // TODO: find way to test it
  xit('should handle maxValidator', async () => {
    const timeInput = component.timeInput();

    const errors = component.control.errors!;
    expect(Object.keys(errors)).toEqual(['sbbTimeMax']);
    expect(errors['sbbTimeMax'].actual).toEqual(timeInput.valueAsDate);
  });

  // TODO: find way to test it
  xit('should handle writeValue via FormControl', async () => {
    const timeInput = component.timeInput();
    const control = component.control;

    // Test with a valid date instance
    const validDate = new Date('1970-01-01T14:20:00');
    control.setValue(validDate);
    expect(defaultDateAdapter.toIso8601(timeInput.valueAsDate!)).toEqual(
      defaultDateAdapter.toIso8601(validDate),
    );

    // Test with an invalid date string
    const invalidDateString = 'invalid-date';
    control.setValue(invalidDateString as unknown as Date);
    expect(timeInput.value).toEqual(invalidDateString);
    expect(timeInput.valueAsDate).toBeNull();

    // Test with null
    control.setValue(null);
    expect(timeInput.valueAsDate).toBeNull();
    expect(timeInput.value).toEqual('');

    // Test with undefined
    control.setValue(undefined as unknown as Date);
    expect(timeInput.valueAsDate).toBeNull();
    expect(timeInput.value).toEqual('undefined');
  });

  it('should be touched on blur', async () => {
    expect(component.control.touched).toBeFalse();

    (fixture.nativeElement as HTMLElement)
      .querySelector('sbb-time-input')!
      .dispatchEvent(new FocusEvent('blur'));

    expect(component.control.touched).toBeTrue();
  });
});

@Component({
  template: `<sbb-time-input [formControl]="control"></sbb-time-input>`,
  imports: [SbbTimeInput, ReactiveFormsModule],
})
class TestComponent {
  timeInput = viewChild.required(SbbTimeInput);
  control = new FormControl(new Date('1970-01-01T14:48:00'));
}
