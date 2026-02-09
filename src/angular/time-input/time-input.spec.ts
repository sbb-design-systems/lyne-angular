import { Component, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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

  it('should not initially emit valueChange', async () => {
    expect(component).toBeDefined();
    expect(component.valueChangeCount).toEqual(0);
  });

  it('should handle formControl', async () => {
    expect(lyneElement.textContent).toEqual('14:48');
    const oldValue = component.control.value;

    component.timeInput().value = '15:20';
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

    lyneElement.value = '--';
    lyneElement.dispatchEvent(new Event('invalid'));

    expect(lyneElement.value).toBe('--');
    expect(component.control.valid).toBe(false);
  });

  it('should handle parseValidator', async () => {
    component.timeInput().value = '--';

    expect(component.control.errors).toEqual({ sbbTimeParse: { text: '--' } });
  });

  it('should handle maxValidator', async () => {
    const timeInput = component.timeInput();
    component.timeInput().value = '99:99';

    const errors = component.control.errors!;
    expect(Object.keys(errors)).toEqual(['sbbTimeMax']);
    expect(errors['sbbTimeMax'].actual).toEqual(timeInput.valueAsDate);
  });

  it('should handle writeValue via FormControl', async () => {
    const timeInput = component.timeInput();
    const control = component.control;

    // Test with a valid date instance
    const validDate = new Date('1970-01-01T14:20:00');
    control.setValue(validDate);
    expect(timeInput.valueAsDate!.toTimeString()).toEqual(validDate.toTimeString());

    // Test with an invalid time string
    const invalidDateString = '--';
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
    expect(timeInput.value).toEqual('');
  });

  it('should be touched on blur', async () => {
    expect(component.control.touched).toBe(false);

    (fixture.nativeElement as HTMLElement)
      .querySelector('sbb-time-input')!
      .dispatchEvent(new FocusEvent('blur'));

    expect(component.control.touched).toBe(true);
  });

  it('should have correct state with user input', async () => {
    expect(component.control.valid).toBe(true);
    lyneElement.dispatchEvent(new InputEvent('beforeinput'));
    lyneElement.textContent = '12:12';
    lyneElement.dispatchEvent(new InputEvent('input'));

    expect(component.control.valid).toBe(true);
    expect(component.control.value).not.toBeNull();
    expect(component.control.value).toEqual(new Date('1970-01-01T12:12:00'));
  });
});

@Component({
  template: `<sbb-time-input [formControl]="control"></sbb-time-input>`,
  imports: [SbbTimeInput, ReactiveFormsModule],
})
class TestComponent {
  timeInput = viewChild.required(SbbTimeInput);
  control = new FormControl(new Date('1970-01-01T14:48:00'));
  valueChangeCount = 0;

  constructor() {
    this.control.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.valueChangeCount++);
  }
}
