import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbNavigationButtonDirective } from './navigation-button.js';

describe('SbbNavigationButtonDirective', () => {
  let component: SbbNavigationButtonDirective;
  let fixture: ComponentFixture<SbbNavigationButtonDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbNavigationButtonDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
