import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbClockDirective } from './clock.js';

describe('SbbClockDirective', () => {
  let component: SbbClockDirective;
  let fixture: ComponentFixture<SbbClockDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbClockDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
