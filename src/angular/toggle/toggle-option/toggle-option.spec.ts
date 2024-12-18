import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbToggleOptionDirective } from './toggle-option.js';

describe('SbbToggleOptionDirective', () => {
  let component: SbbToggleOptionDirective;
  let fixture: ComponentFixture<SbbToggleOptionDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbToggleOptionDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
