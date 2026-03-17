import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbCalendarWeekday } from './calendar-weekday';

describe('sbb-calendar-weekday', () => {
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
  template: `<sbb-calendar-weekday></sbb-calendar-weekday>`,
  imports: [SbbCalendarWeekday],
})
class TestComponent {}
