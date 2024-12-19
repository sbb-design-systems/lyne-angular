import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbMessageDirective } from './message.js';

describe('SbbMessageDirective', () => {
  let component: SbbMessageDirective;
  let fixture: ComponentFixture<SbbMessageDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbMessageDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
