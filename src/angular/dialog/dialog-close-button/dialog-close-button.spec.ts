import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbDialogCloseButton } from './dialog-close-button';

describe('sbb-dialog-close-button', () => {
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
  template: `<sbb-dialog-close-button></sbb-dialog-close-button>`,
  imports: [SbbDialogCloseButton],
})
class TestComponent {}
