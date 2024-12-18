import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbStepperDirective } from './stepper.js';

describe('SbbStepperDirective', () => {
  let component: SbbStepperDirective;
  let fixture: ComponentFixture<SbbStepperDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbStepperDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
