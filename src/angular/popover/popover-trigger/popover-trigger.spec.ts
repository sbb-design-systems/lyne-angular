import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbPopoverTrigger } from './popover-trigger';

describe('sbb-popover-trigger', () => {
  let fixture: ComponentFixture<TestComponent>, component: TestComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });
});

@Component({
  template: `<sbb-popover-trigger></sbb-popover-trigger>`,
  imports: [SbbPopoverTrigger],
})
class TestComponent {}
