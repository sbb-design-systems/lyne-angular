import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbAccentButtonLinkDirective } from './accent-button-link.js';

describe('SbbAccentButtonLinkDirective', () => {
  let component: SbbAccentButtonLinkDirective;
  let fixture: ComponentFixture<SbbAccentButtonLinkDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbAccentButtonLinkDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
