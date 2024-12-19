import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbButtonLinkDirective } from './button-link.js';

describe('SbbButtonLinkDirective', () => {
  let component: SbbButtonLinkDirective;
  let fixture: ComponentFixture<SbbButtonLinkDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbButtonLinkDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
