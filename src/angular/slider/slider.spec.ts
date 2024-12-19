import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbSliderDirective } from './slider.js';

describe('SbbSliderDirective', () => {
  let component: SbbSliderDirective;
  let fixture: ComponentFixture<SbbSliderDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbSliderDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
