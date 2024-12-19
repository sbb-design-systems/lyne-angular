import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTimetableRowDirective } from './timetable-row.js';

describe('SbbTimetableRowDirective', () => {
  let component: SbbTimetableRowDirective;
  let fixture: ComponentFixture<SbbTimetableRowDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbTimetableRowDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
