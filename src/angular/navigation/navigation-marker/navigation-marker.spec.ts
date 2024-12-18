import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbNavigationMarkerDirective } from './navigation-marker.js';

describe('SbbNavigationMarkerDirective', () => {
  let component: SbbNavigationMarkerDirective;
  let fixture: ComponentFixture<SbbNavigationMarkerDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbNavigationMarkerDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
