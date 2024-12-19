import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTimetableOccupancyIconDirective } from './timetable-occupancy-icon.js';

describe('SbbTimetableOccupancyIconDirective', () => {
  let component: SbbTimetableOccupancyIconDirective;
  let fixture: ComponentFixture<SbbTimetableOccupancyIconDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbTimetableOccupancyIconDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
