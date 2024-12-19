import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbCardBadgeDirective } from './card-badge.js';

describe('SbbCardBadgeDirective', () => {
  let component: SbbCardBadgeDirective;
  let fixture: ComponentFixture<SbbCardBadgeDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbCardBadgeDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
