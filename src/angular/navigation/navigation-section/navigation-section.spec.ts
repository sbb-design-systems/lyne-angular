import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbNavigationSectionDirective } from './navigation-section.js';

describe('SbbNavigationSectionDirective', () => {
  let component: SbbNavigationSectionDirective;
  let fixture: ComponentFixture<SbbNavigationSectionDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbNavigationSectionDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
