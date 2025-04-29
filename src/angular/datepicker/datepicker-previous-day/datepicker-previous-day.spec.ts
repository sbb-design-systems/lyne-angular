import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbDatepickerPreviousDay } from './datepicker-previous-day';

describe('sbb-datepicker-previous-day', () => {
  let fixture: ComponentFixture<TestComponent>, component: TestComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

@Component({
  template: `<sbb-datepicker-previous-day></sbb-datepicker-previous-day>`,
  imports: [SbbDatepickerPreviousDay],
})
class TestComponent {}
