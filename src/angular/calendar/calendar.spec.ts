import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbCalendarDirective } from './calendar.js';

describe('SbbCalendarDirective', () => {
  let component: SbbCalendarDirective;
  let fixture: ComponentFixture<SbbCalendarDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbCalendarDirective<Date>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
