import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbPopoverCloseButton } from './popover-close-button';

describe('sbb-popover-close-button', () => {
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
  template: `<sbb-popover-close-button></sbb-popover-close-button>`,
  imports: [SbbPopoverCloseButton],
})
class TestComponent {}
