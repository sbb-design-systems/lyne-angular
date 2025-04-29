import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbDatepickerNextDay } from './datepicker-next-day';

describe('sbb-datepicker-next-day', () => {
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
  template: `<sbb-datepicker-next-day></sbb-datepicker-next-day>`,
  imports: [SbbDatepickerNextDay],
})
class TestComponent {}
