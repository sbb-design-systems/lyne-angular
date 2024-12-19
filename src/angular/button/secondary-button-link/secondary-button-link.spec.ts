import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbSecondaryButtonLinkDirective } from './secondary-button-link.js';

describe('SbbSecondaryButtonLinkDirective', () => {
  let component: SbbSecondaryButtonLinkDirective;
  let fixture: ComponentFixture<SbbSecondaryButtonLinkDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbSecondaryButtonLinkDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
