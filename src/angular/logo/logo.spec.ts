import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbLogoDirective } from './logo.js';

describe('SbbLogoDirective', () => {
  let component: SbbLogoDirective;
  let fixture: ComponentFixture<SbbLogoDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbLogoDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
