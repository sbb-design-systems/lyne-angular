import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbMiniCalendarMonth } from './mini-calendar-month';

describe('sbb-mini-calendar-month', () => {
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
  template: `<sbb-mini-calendar-month></sbb-mini-calendar-month>`,
  imports: [SbbMiniCalendarMonth],
})
class TestComponent {}
