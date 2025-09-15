import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTimetableFormField } from './timetable-form-field';

describe('sbb-timetable-form-field', () => {
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
  template: `<sbb-timetable-form-field></sbb-timetable-form-field>`,
  imports: [SbbTimetableFormField],
})
class TestComponent {}
