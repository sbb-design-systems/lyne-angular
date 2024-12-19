import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbLoadingIndicatorCircleDirective } from './loading-indicator-circle.js';

describe('SbbLoadingIndicatorCircleDirective', () => {
  let component: SbbLoadingIndicatorCircleDirective;
  let fixture: ComponentFixture<SbbLoadingIndicatorCircleDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbLoadingIndicatorCircleDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
