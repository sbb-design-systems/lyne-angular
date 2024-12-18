import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTimetableDurationDirective } from './timetable-duration.js';

describe('SbbTimetableDurationDirective', () => {
  let component: SbbTimetableDurationDirective;
  let fixture: ComponentFixture<SbbTimetableDurationDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbTimetableDurationDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
