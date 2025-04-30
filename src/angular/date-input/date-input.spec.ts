import { Component, viewChild } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
    lyneElement = (fixture.debugElement.nativeElement as HTMLElement).querySelector(
      'sbb-date-input',
    )!;
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  it('should handle formControl', async () => {
    expect(lyneElement.textContent).toEqual('We, 30.04.2025');
    const oldValue = component.control.value;

    component.dateInput()!.value = '2025-05-01';
    lyneElement.dispatchEvent(new Event('change'));

    expect(component.control.value).not.toEqual(oldValue);
  });

  it('should handle parseValidator', async () => {
    component.dateInput()!.value = 'invalid';

    expect(component.control.errors).toEqual({ sbbDateParse: { text: 'invalid' } });
  });

  it('should handle minValidator', async () => {
    const dateInput = component.dateInput()!;
    dateInput.min = new Date('2026-01-01');

    expect(dateInput.valueAsDate?.toJSON()).toEqual('2025-04-29T22:00:00.000Z');

    const errors = component.control.errors!;
    expect(Object.keys(errors)).toEqual(['sbbDateMin']);
    expect(errors['sbbDateMin'].min).toEqual(dateInput.min);
    expect(errors['sbbDateMin'].actual).toEqual(dateInput.valueAsDate);
  });

  it('should handle maxValidator', async () => {
    const dateInput = component.dateInput()!;
    dateInput.max = new Date('2024-01-01');

    expect(dateInput.valueAsDate?.toJSON()).toEqual('2025-04-29T22:00:00.000Z');

    const errors = component.control.errors!;
    expect(Object.keys(errors)).toEqual(['sbbDateMax']);
    expect(errors['sbbDateMax'].max).toEqual(dateInput.max);
    expect(errors['sbbDateMax'].actual).toEqual(dateInput.valueAsDate);
  });

  it('should handle dateFilter', async () => {
    const dateInput = component.dateInput()!;
    dateInput.dateFilter = () => false;

    expect(dateInput.valueAsDate?.toJSON()).toEqual('2025-04-29T22:00:00.000Z');

    const errors = component.control.errors!;
    expect(Object.keys(errors)).toEqual(['sbbDateFilter']);
  });
});

@Component({
  template: `<sbb-date-input [formControl]="control"></sbb-date-input>`,
  imports: [SbbDateInput, ReactiveFormsModule],
})
class TestComponent {
  dateInput = viewChild(SbbDateInput<Date>);
  control = new FormControl(new Date('2025-04-30'));
}
