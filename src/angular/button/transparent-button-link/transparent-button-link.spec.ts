import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbTransparentButtonLinkDirective } from './transparent-button-link.js';

describe('SbbTransparentButtonLinkDirective', () => {
  let component: SbbTransparentButtonLinkDirective;
  let fixture: ComponentFixture<SbbTransparentButtonLinkDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbTransparentButtonLinkDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
