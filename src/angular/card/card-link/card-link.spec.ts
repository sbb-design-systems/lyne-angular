import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbCardLinkDirective } from './card-link.js';

describe('SbbCardLinkDirective', () => {
  let component: SbbCardLinkDirective;
  let fixture: ComponentFixture<SbbCardLinkDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbCardLinkDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
