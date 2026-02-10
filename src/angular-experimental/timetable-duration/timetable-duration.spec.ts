import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTimetableDuration } from './timetable-duration';

describe('sbb-timetable-duration', () => {
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
  template: `<sbb-timetable-duration [config]="config"></sbb-timetable-duration>`,
  imports: [SbbTimetableDuration],
})
class TestComponent {
  config = JSON.stringify([
    {
      hours: 0,
      minutes: 37,
    },
    {
      hours: 1,
      minutes: 1,
    },
    {
      hours: 3,
      minutes: 12,
    },
  ]);
}
