import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbDatepickerPreviousDayDirective } from './datepicker-previous-day.js';

describe('SbbDatepickerPreviousDayDirective', () => {
  let component: SbbDatepickerPreviousDayDirective;
  let fixture: ComponentFixture<SbbDatepickerPreviousDayDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbDatepickerPreviousDayDirective<Date>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
