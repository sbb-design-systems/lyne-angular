import { Component } from '@angular/core';
import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import type { SbbTimetableOccupancyIconElement } from '@sbb-esta/lyne-elements/timetable-occupancy-icon.js';

import { SbbTimetableOccupancyIcon } from './timetable-occupancy-icon';

describe('sbb-timetable-occupancy-icon', () => {
  let fixture: ComponentFixture<TestComponent>,
    component: TestComponent,
    lyneElement: SbbTimetableOccupancyIconElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
  }));

  beforeEach(async () => {
    await customElements.whenDefined('sbb-timetable-occupancy-icon');
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    lyneElement = (fixture.debugElement.nativeElement as HTMLElement).querySelector(
      'sbb-timetable-occupancy-icon',
    )!;
  });

  it('should create', async () => {
    expect(lyneElement.matches(':defined')).toBeTrue();
    expect(component).toBeDefined();
  });
});

@Component({
  template: `<sbb-timetable-occupancy-icon></sbb-timetable-occupancy-icon>`,
  imports: [SbbTimetableOccupancyIcon],
})
class TestComponent {}
