import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbMiniCalendarDay } from './mini-calendar-day';

describe('sbb-mini-calendar-day', () => {
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
  template: `<sbb-mini-calendar-day></sbb-mini-calendar-day>`,
  imports: [SbbMiniCalendarDay],
})
class TestComponent {}
