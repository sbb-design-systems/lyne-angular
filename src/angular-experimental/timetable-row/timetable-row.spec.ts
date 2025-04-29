import { Component } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SbbTimetableRow } from '@sbb-esta/lyne-angular-experimental/timetable-row';
import type { SbbTimetableRowElement } from '@sbb-esta/lyne-elements-experimental/timetable-row.js';

describe('timetable-row', () => {
  let fixture: ComponentFixture<TestComponent>, lyneElement: SbbTimetableRowElement;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });

    await customElements.whenDefined('sbb-timetable-row');
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    lyneElement = fixture.debugElement.nativeElement.querySelector('sbb-timetable-row')!;
  }));

  it('should be defined', async () => {
    expect(lyneElement.matches(':defined')).toBeTrue();
  });
});

@Component({
  template: `<sbb-timetable-row></sbb-timetable-row>`,
  imports: [SbbTimetableRow],
})
class TestComponent {}
