import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbBlockLinkStaticDirective } from './block-link-static.js';

describe('SbbBlockLinkStaticDirective', () => {
  let component: SbbBlockLinkStaticDirective;
  let fixture: ComponentFixture<SbbBlockLinkStaticDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbBlockLinkStaticDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
