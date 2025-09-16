import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTimetableFormSwapButton } from './timetable-form-swap-button';

describe('sbb-timetable-form-swap-button', () => {
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
  template: `<sbb-timetable-form-swap-button></sbb-timetable-form-swap-button>`,
  imports: [SbbTimetableFormSwapButton],
})
class TestComponent {}
