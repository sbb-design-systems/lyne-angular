import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbLoadingIndicatorDirective } from './loading-indicator.js';

describe('SbbLoadingIndicatorDirective', () => {
  let component: SbbLoadingIndicatorDirective;
  let fixture: ComponentFixture<SbbLoadingIndicatorDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbLoadingIndicatorDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
