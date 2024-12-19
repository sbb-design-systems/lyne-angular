import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbBlockLinkButtonDirective } from './block-link-button.js';

describe('SbbBlockLinkButtonDirective', () => {
  let component: SbbBlockLinkButtonDirective;
  let fixture: ComponentFixture<SbbBlockLinkButtonDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbBlockLinkButtonDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
