import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbStepLabelDirective } from './step-label.js';

describe('SbbStepLabelDirective', () => {
  let component: SbbStepLabelDirective;
  let fixture: ComponentFixture<SbbStepLabelDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbStepLabelDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
