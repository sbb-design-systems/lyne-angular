import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';

import { SbbSelectionActionPanel } from './selection-action-panel';

describe('sbb-selection-action-panel', () => {
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
  template: `<sbb-selection-action-panel></sbb-selection-action-panel>`,
  imports: [SbbSelectionActionPanel],
})
class TestComponent {}
