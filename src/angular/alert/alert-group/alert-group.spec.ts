import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbAlertGroupDirective } from './alert-group.js';

describe('SbbAlertGroupDirective', () => {
  let component: SbbAlertGroupDirective;
  let fixture: ComponentFixture<SbbAlertGroupDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbAlertGroupDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
