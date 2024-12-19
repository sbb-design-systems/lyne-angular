import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbPopoverTriggerDirective } from './popover-trigger.js';

describe('SbbPopoverTriggerDirective', () => {
  let component: SbbPopoverTriggerDirective;
  let fixture: ComponentFixture<SbbPopoverTriggerDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbPopoverTriggerDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
