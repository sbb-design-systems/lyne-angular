import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTimetableOccupancyDirective } from './timetable-occupancy.js';

describe('SbbTimetableOccupancyDirective', () => {
  let component: SbbTimetableOccupancyDirective;
  let fixture: ComponentFixture<SbbTimetableOccupancyDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbTimetableOccupancyDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
