import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbBlockLinkDirective } from './block-link.js';

describe('SbbBlockLinkDirective', () => {
  let component: SbbBlockLinkDirective;
  let fixture: ComponentFixture<SbbBlockLinkDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbBlockLinkDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
