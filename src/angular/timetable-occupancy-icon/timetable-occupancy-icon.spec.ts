import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTimetableOccupancyIcon } from './timetable-occupancy-icon';

describe('sbb-timetable-occupancy-icon', () => {
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
  template: `<sbb-timetable-occupancy-icon></sbb-timetable-occupancy-icon>`,
  imports: [SbbTimetableOccupancyIcon],
})
class TestComponent {}
