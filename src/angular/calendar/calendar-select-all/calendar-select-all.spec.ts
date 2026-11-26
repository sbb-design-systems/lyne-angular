import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbCalendarSelectAll } from './calendar-select-all';

describe('sbb-calendar-select-all', () => {
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
  template: `<sbb-calendar-select-all></sbb-calendar-select-all>`,
  imports: [SbbCalendarSelectAll],
})
class TestComponent {}
