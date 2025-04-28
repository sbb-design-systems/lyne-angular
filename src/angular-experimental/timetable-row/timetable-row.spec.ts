import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SbbTimetableRow } from '@sbb-esta/lyne-angular-experimental/timetable-row';

describe('timetable-row', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
  }));

  it('should load', async () => {
    await customElements.whenDefined('sbb-timetable-row');
    const fixture = TestBed.createComponent(TimetableRowTest);
    fixture.detectChanges();
  });
});

@Component({
  template: `<sbb-timetable-row></sbb-timetable-row>`,
  imports: [SbbTimetableRow],
})
class TimetableRowTest {}
