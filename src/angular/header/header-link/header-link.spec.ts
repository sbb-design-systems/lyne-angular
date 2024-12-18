import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbHeaderLinkDirective } from './header-link.js';

describe('SbbHeaderLinkDirective', () => {
  let component: SbbHeaderLinkDirective;
  let fixture: ComponentFixture<SbbHeaderLinkDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbHeaderLinkDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
