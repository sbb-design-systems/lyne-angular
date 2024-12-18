import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbNavigationListDirective } from './navigation-list.js';

describe('SbbNavigationListDirective', () => {
  let component: SbbNavigationListDirective;
  let fixture: ComponentFixture<SbbNavigationListDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbNavigationListDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
