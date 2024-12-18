import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbDatepickerNextDayDirective } from './datepicker-next-day.js';

describe('SbbDatepickerNextDayDirective', () => {
  let component: SbbDatepickerNextDayDirective;
  let fixture: ComponentFixture<SbbDatepickerNextDayDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbDatepickerNextDayDirective<Date>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
