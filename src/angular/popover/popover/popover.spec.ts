import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbPopoverDirective } from './popover.js';

describe('SbbPopoverDirective', () => {
  let component: SbbPopoverDirective;
  let fixture: ComponentFixture<SbbPopoverDirective>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SbbPopoverDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
