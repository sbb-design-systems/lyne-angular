import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbOverlayDirective } from './overlay.js';

describe('SbbOverlayDirective', () => {
  let component: SbbOverlayDirective;
  let fixture: ComponentFixture<SbbOverlayDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbOverlayDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
