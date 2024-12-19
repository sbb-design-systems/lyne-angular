import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbNavigationLinkDirective } from './navigation-link.js';

describe('SbbNavigationLinkDirective', () => {
  let component: SbbNavigationLinkDirective;
  let fixture: ComponentFixture<SbbNavigationLinkDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbNavigationLinkDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
