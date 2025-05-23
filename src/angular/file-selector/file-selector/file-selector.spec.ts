import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbFileSelector } from './file-selector';

describe('sbb-file-selector', () => {
  let fixture: ComponentFixture<TestComponent>, component: TestComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeDefined();
  });

  // TODO: Add tests for formControl.
});

@Component({
  template: `<sbb-file-selector></sbb-file-selector>`,
  imports: [SbbFileSelector],
})
class TestComponent {}
