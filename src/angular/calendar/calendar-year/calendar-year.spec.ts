import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbCalendarYear } from './calendar-year';

describe('sbb-calendar-year', () => {
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
  template: `<sbb-calendar-year></sbb-calendar-year>`,
  imports: [SbbCalendarYear],
})
class TestComponent {}
