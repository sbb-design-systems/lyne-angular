import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbDatepickerToggleDirective } from './datepicker-toggle.js';

describe('SbbDatepickerToggleDirective', () => {
  let component: SbbDatepickerToggleDirective;
  let fixture: ComponentFixture<SbbDatepickerToggleDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbDatepickerToggleDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
