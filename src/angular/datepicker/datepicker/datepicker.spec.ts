import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbDatepickerDirective } from './datepicker.js';

describe('SbbDatepickerDirective', () => {
  let component: SbbDatepickerDirective;
  let fixture: ComponentFixture<SbbDatepickerDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbDatepickerDirective<Date>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
