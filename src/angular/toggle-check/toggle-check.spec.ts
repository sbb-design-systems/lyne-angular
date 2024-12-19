import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbToggleCheckDirective } from './toggle-check.js';

describe('SbbToggleCheckDirective', () => {
  let component: SbbToggleCheckDirective;
  let fixture: ComponentFixture<SbbToggleCheckDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbToggleCheckDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
