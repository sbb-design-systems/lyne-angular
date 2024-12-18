import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbAlertDirective } from './alert.js';

describe('SbbAlertDirective', () => {
  let component: SbbAlertDirective;
  let fixture: ComponentFixture<SbbAlertDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbAlertDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
