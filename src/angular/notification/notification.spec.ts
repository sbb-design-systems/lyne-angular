import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbNotificationDirective } from './notification.js';

describe('SbbNotificationDirective', () => {
  let component: SbbNotificationDirective;
  let fixture: ComponentFixture<SbbNotificationDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbNotificationDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
