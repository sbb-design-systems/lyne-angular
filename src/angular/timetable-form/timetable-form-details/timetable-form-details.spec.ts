import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTimetableFormDetails } from './timetable-form-details';

describe('sbb-timetable-form-details', () => {
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
  template: `<sbb-timetable-form-details></sbb-timetable-form-details>`,
  imports: [SbbTimetableFormDetails],
})
class TestComponent {}
