import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbNavigationDirective } from './navigation.js';

describe('SbbNavigationDirective', () => {
  let component: SbbNavigationDirective;
  let fixture: ComponentFixture<SbbNavigationDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbNavigationDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
