import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbStepDirective } from './step.js';

describe('SbbStepDirective', () => {
  let component: SbbStepDirective;
  let fixture: ComponentFixture<SbbStepDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbStepDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
