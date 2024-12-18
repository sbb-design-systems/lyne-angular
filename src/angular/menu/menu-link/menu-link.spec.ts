import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbMenuLinkDirective } from './menu-link.js';

describe('SbbMenuLinkDirective', () => {
  let component: SbbMenuLinkDirective;
  let fixture: ComponentFixture<SbbMenuLinkDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbMenuLinkDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
